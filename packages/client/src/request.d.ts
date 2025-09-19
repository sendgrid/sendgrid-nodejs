import RequestOptions from "@sendgrid/helpers/classes/request";

export type ClientRequest<TData = any, TParams = any> = RequestOptions<
  TData,
  TParams
>;
