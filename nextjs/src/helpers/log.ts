import {TRPCError} from "@trpc/server"
import {TRPC_ERROR_CODE_KEY} from "@trpc/server/rpc";

type trpcProps = ConstructorParameters<typeof TRPCError>[0]

type ApiErrorLog = {
  code?: trpcProps['code'],
  msg: trpcProps['message'],
  cause?: trpcProps['cause'],
  error?: Error,
  validation?: Record<string, string>
  id: string,
}

export const apiError = (params: ApiErrorLog) => {
  let code: TRPC_ERROR_CODE_KEY = "INTERNAL_SERVER_ERROR";
  if (params.validation) {
    code = "BAD_REQUEST"
  }
  if (params.code) {
    code = params.code
  }

  const errorArg = {
    code: code,
    message: params.msg,
    cause: {
      ...params.cause || {},
      originalMessage: params.error instanceof Error ? params.error.message : "Unknown error",
      validation: params.validation
    }
  }

  // TODO integrate datadog or other log aggregation tool
  console.error(errorArg)

  throw new TRPCError(errorArg);
}

type LogError = {
  msg: string,
  error?: Error
}

export const errorLog = (params: LogError) =>{
  console.error(JSON.stringify({ ...params, errorMessage: params.error?.message }, null, 2))
}