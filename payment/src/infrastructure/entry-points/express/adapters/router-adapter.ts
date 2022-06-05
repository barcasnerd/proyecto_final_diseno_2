import {ControllerAction} from '../../../../application/ports/controllers/controller.port';
import {Request, Response, NextFunction} from 'express';

export function routeAdapter(action: ControllerAction) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await action({
                body: req.body,
                headers: req.headers,
                params: req.params,
                query: req.query,
            });
            res.status(response.statusCode);
            return res.json({
                status: response.status,
                data: response.data
            });
        } catch (err) {
            console.log('[ERROR]', err);
            res.status(500);
            return res.json({
                status: 'error',
                error: err
            });
        }
    };
}
