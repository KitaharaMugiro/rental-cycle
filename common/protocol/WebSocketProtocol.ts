export type WebSocketRequestProtocol<E> = {
  event: any;
  data: E;
};

export type WebSocketResponseProtocol = {
  data: any;
};
