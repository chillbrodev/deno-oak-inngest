import { Router } from 'https://deno.land/x/oak@v12.6.1/router.ts';
import serve from './oak_client.ts';

export class InngestRouter {
	constructor(
		readonly router: Router,
	) {
		this.router
			.get('/api/inngest', async (ctx) => {
				const resp = await serve(ctx.request);
				ctx.response.body = resp.body;
				ctx.response.status = resp.status;
				for (const key in resp.headers) {
					ctx.response.headers.set(key, resp.headers[key]);
				}
			})
			.post('/api/inngest', async (ctx) => {
				const resp = await serve(ctx.request);
				ctx.response.body = resp.body;
				ctx.response.status = resp.status;
				for (const key in resp.headers) {
					ctx.response.headers.set(key, resp.headers[key]);
				}
			})
			.put('/api/inngest', async (ctx) => {
				const resp = await serve(ctx.request);
				ctx.response.body = resp.body;
				ctx.response.status = resp.status;
				for (const key in resp.headers) {
					ctx.response.headers.set(key, resp.headers[key]);
				}
			});
	}
}
