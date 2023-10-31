import { Request } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import {
	Inngest,
	InngestCommHandler,
	type ServeHandlerOptions,
} from 'npm:inngest';

const serve = (options: ServeHandlerOptions) => {
	const handler = new InngestCommHandler({
		frameworkName: 'oak',
		fetch: fetch.bind(globalThis),
		...options,
		handler: (req: Request) => {
			return {
				body: () =>
					req.body({
						type: 'json',
					}).value,
				headers: (key) => req.headers.get(key),
				method: () => req.method,
				url: () =>
					new URL(
						req.url,
						`https://${req.headers.get('host') || ''}`,
					),
				transformResponse: ({ body, status, headers }) => {
					return { body: body, status: status, headers: headers };
				},
			};
		},
	});

	return handler.createHandler();
};

export const inngest = new Inngest({
	id: 'inngest-oak-sample',
});

const helloWorldFn = inngest.createFunction(
	{ id: 'hello-world' },
	{ event: 'test/hello.world' },
	() => 'Hello, World!',
);

export default serve({
	client: inngest,
	functions: [helloWorldFn],
});
