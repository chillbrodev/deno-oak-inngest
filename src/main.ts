import { load } from 'https://deno.land/std@0.202.0/dotenv/mod.ts';
import { Application, Router } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import { inngest } from './inngest/oak_client.ts';
import { InngestRouter } from './inngest/inngest.router.ts';

await load({ export: true });
const app = new Application();
const router = new Router();
const port = Number(Deno.env.get('PORT'));
const env = Deno.env.get('DENO_ENV');
const inngestRouter = new InngestRouter(router);

const inngestEventKey = Deno.env.get('INNGEST_EVENT_KEY')!;
inngest.setEventKey(inngestEventKey);

router
	.get('/', (ctx) => {
		ctx.response.body = { msg: 'Hello Inngest with Oak' };
	})
	.use(inngestRouter.router.routes(), inngestRouter.router.allowedMethods());

// Order of Middleware Setup. Order Matters
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
	console.log(`Listening on ${port} for env ${env}`);
});


await app.listen({ port });
