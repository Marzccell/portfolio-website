import handler from "vinext/server/app-router-entry";

interface WorkerAssetEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  fetch(request: Request, env: WorkerAssetEnv, context: ExecutionContext) {
    return handler.fetch(request, env, context);
  },
};

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}
