// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';



import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors, param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Keys as llaves} from '../config/keys';
import {ProponenteTrabajoRepository} from '../repositories';

export class CargarArchivosController {
  constructor(
    @repository(ProponenteTrabajoRepository)
    private ProponenteTrabajoRepository: ProponenteTrabajoRepository
  ) { }



  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarFotoProponente/{proponenteTrabajoId}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de una foto de una solicitud.',
      },
    },
  })
  async cargarFotoProponente(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("proponenteTrabajoId") ProponenteTrabajoId: number
  ): Promise<object | false> {
    const rutaFoto = path.join(__dirname, llaves.carpetaFotoProponente);
    let res = await this.StoreFileToPath(rutaFoto, llaves.nombreCampoFotoProponente, request, response, llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let data = {
          foto: nombre_archivo
        }
        await this.ProponenteTrabajoRepository.updateById(ProponenteTrabajoId, data);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

    /**
   *
   * @param response
   * @param request
   */
  @post('/CargarImagenPrincipalProponente', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la imagen de un proponente de trabajo.',
      },
    },
  })
  async cargarImagenPrincipalDelProponente(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request
  ): Promise<object | false> {
    const rutaImagenProponente = path.join(__dirname, llaves.carpetaFotoProponente);
    let res = await this.StoreFileToPath(rutaImagenProponente, llaves.nombreCampoFotoProponente, request, response, llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }
  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarDocumentoProponente', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de documentos del proponente.',
      },
    },
  })
  async DocumentosProponente(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutaDocumentoProponente = path.join(__dirname, llaves.carpetaDocumentoProponente);
    let res = await this.StoreFileToPath(rutaDocumentoProponente, llaves.nombreCampoDocumentoProponente, request, response, llaves.extensionesPermitidasDOC);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }


  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path)
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido.'));
        },
        limits: {
          fileSize: llaves.tamMaxImagenProponente
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

}
