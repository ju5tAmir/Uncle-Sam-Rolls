/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Customer {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  name?: string;
  /**
   * @minLength 0
   * @maxLength 255
   */
  address?: string | null;
  /**
   * @minLength 0
   * @maxLength 50
   */
  phone?: string | null;
  /**
   * @minLength 0
   * @maxLength 255
   */
  email?: string | null;
  orders?: Order[];
}

export interface Order {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate?: string;
  /** @format date */
  deliveryDate?: string | null;
  /**
   * @minLength 0
   * @maxLength 50
   */
  status?: string;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  customer?: Customer | null;
  orderEntries?: OrderEntry[];
}

export interface OrderEntry {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number | null;
  /** @format int32 */
  orderId?: number | null;
  order?: Order | null;
  product?: Paper | null;
}

export interface Paper {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  orderEntries?: OrderEntry[];
  properties?: Property[];
}

export interface Property {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  propertyName?: string;
  papers?: Paper[];
}

export interface CustomerResponseDto {
  name?: string;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface CustomerCreateDto {
  name?: string;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface OrderResponseDto {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate?: string;
  /** @format date */
  deliveryDate?: string | null;
  status?: string;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  orderEntries?: OrderEntryDto[];
}

export interface OrderEntryDto {
  /** @format int32 */
  paperId?: number | null;
  /** @format int32 */
  quantity?: number;
}

export interface OrderCreateDto {
  orderEntries?: OrderEntryDto[];
  /** @format int32 */
  customerId?: number;
}

export interface OrderUpdateDto {
  /** @format int32 */
  id?: number;
  status?: string;
}

export interface PaperToClient {
  /** @format int32 */
  id?: number;
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  properties?: PropertyToClient[];
}

export interface PropertyToClient {
  /** @format int32 */
  propertyId?: number;
  propertyName?: string;
}

export interface PaperResponseDto {
  /** @format int32 */
  id?: number;
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
}

export interface PaperCreateDto {
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
}

export interface AddPropertiesToPaperResponseDto {
  paperResponse?: PaperResponseDto;
  propertyResponse?: PropertyResponseDto[];
}

export interface PropertyResponseDto {
  /** @format int32 */
  propertyId?: number;
  propertyName?: string;
}

export interface AddPropertiesToPaperDto {
  /** @format int32 */
  paperId?: number;
  properties?: number[];
}

export interface PropertyCreateDto {
  propertyName?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:1337" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title My Title
 * @version 1.0.0
 * @baseUrl http://localhost:1337
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Customer
     * @name CustomerGetAllCustomers
     * @request GET:/api/customer/all
     */
    customerGetAllCustomers: (params: RequestParams = {}) =>
      this.request<Customer[], any>({
        path: `/api/customer/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerGetCustomer
     * @request GET:/api/customer/{id}
     */
    customerGetCustomer: (id: number, params: RequestParams = {}) =>
      this.request<Customer, any>({
        path: `/api/customer/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerDeleteCustomer
     * @request DELETE:/api/customer/{id}
     */
    customerDeleteCustomer: (id: number, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/api/customer/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerCreateCustomer
     * @request POST:/api/customer/create
     */
    customerCreateCustomer: (data: CustomerCreateDto, params: RequestParams = {}) =>
      this.request<CustomerResponseDto | null, any>({
        path: `/api/customer/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetAllOrders
     * @request GET:/api/order/get/all
     */
    orderGetAllOrders: (params: RequestParams = {}) =>
      this.request<OrderResponseDto[], any>({
        path: `/api/order/get/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetOrderById
     * @request GET:/api/order/{id}
     */
    orderGetOrderById: (id: number, params: RequestParams = {}) =>
      this.request<OrderResponseDto, any>({
        path: `/api/order/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderCreateOrder
     * @request POST:/api/order/create
     */
    orderCreateOrder: (data: OrderCreateDto, params: RequestParams = {}) =>
      this.request<OrderResponseDto, any>({
        path: `/api/order/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetOrdersByCustomerId
     * @request POST:/api/order/history
     */
    orderGetOrdersByCustomerId: (data: number, params: RequestParams = {}) =>
      this.request<OrderResponseDto[], any>({
        path: `/api/order/history`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetHistoryForUsers
     * @request GET:/api/order/history
     */
    orderGetHistoryForUsers: (params: RequestParams = {}) =>
      this.request<OrderResponseDto[], any>({
        path: `/api/order/history`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderUpdateOrderProperty
     * @request PATCH:/api/order/update
     */
    orderUpdateOrderProperty: (data: OrderUpdateDto, params: RequestParams = {}) =>
      this.request<OrderResponseDto, any>({
        path: `/api/order/update`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetAll
     * @request GET:/api/paper/all
     */
    paperGetAll: (params: RequestParams = {}) =>
      this.request<PaperToClient[], any>({
        path: `/api/paper/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetPaperById
     * @request GET:/api/paper/{id}
     */
    paperGetPaperById: (id: number, params: RequestParams = {}) =>
      this.request<PaperToClient, any>({
        path: `/api/paper/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetPropertiesByPaperId
     * @request GET:/api/paper/{id}/properties
     */
    paperGetPropertiesByPaperId: (id: number, params: RequestParams = {}) =>
      this.request<PropertyToClient[], any>({
        path: `/api/paper/${id}/properties`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperCreate
     * @request POST:/api/paper/create
     */
    paperCreate: (data: PaperCreateDto, params: RequestParams = {}) =>
      this.request<PaperResponseDto, any>({
        path: `/api/paper/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperAddProperties
     * @request POST:/api/paper/add/property
     */
    paperAddProperties: (data: AddPropertiesToPaperDto, params: RequestParams = {}) =>
      this.request<AddPropertiesToPaperResponseDto, any>({
        path: `/api/paper/add/property`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperRestockPaper
     * @request POST:/api/paper/restock
     */
    paperRestockPaper: (
      query?: {
        /** @format int32 */
        paperId?: number;
        /** @format int32 */
        restockCount?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AddPropertiesToPaperResponseDto, any>({
        path: `/api/paper/restock`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperDiscontinuePaper
     * @request POST:/api/paper/discontinue
     */
    paperDiscontinuePaper: (
      query?: {
        /** @format int32 */
        paperId?: number;
        status?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<AddPropertiesToPaperResponseDto, any>({
        path: `/api/paper/discontinue`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyGetAll
     * @request GET:/api/property/all
     */
    propertyGetAll: (params: RequestParams = {}) =>
      this.request<Property[], any>({
        path: `/api/property/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyCreate
     * @request POST:/api/property/create
     */
    propertyCreate: (data: PropertyCreateDto, params: RequestParams = {}) =>
      this.request<Property, any>({
        path: `/api/property/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyUpdate
     * @request PUT:/api/property/update
     */
    propertyUpdate: (data: PropertyToClient, params: RequestParams = {}) =>
      this.request<Property, any>({
        path: `/api/property/update`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyDelete
     * @request DELETE:/api/property/{id}
     */
    propertyDelete: (id: number, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/api/property/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
}
