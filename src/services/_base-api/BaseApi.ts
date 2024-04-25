import axios, { AxiosError } from 'axios'
import { ApiService, apiServiceUrls } from '@/services/_base-api/urls/serviceUrls'

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export const API_TIMEOUT = 30000

export class ApiError extends Error {
  serverData: any = null

  constructor(message: string, serverData: any = null) {
    super(message)
    this.name = 'ApiError'
    this.serverData = serverData
  }
}

export default class BaseApi {
  constructor() {
    axios.defaults.timeout = API_TIMEOUT
  }

  public delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  protected get<T>(url: string, type: ApiService, options?: AxiosRequestConfig) {
    return axios
      .get<T>(apiServiceUrls[type] + url, options)
      .then(extractData)
      .catch(processError)
  }

  protected post<T1, T2>(url: string, payload: T1, type: ApiService, options?: AxiosRequestConfig): Promise<T2> {
    return axios
      .post<T1, AxiosResponse<T2>>(apiServiceUrls[type] + url, payload, options)
      .then(extractData)
      .catch(processError)
  }

  protected patch<T1, T2>(url: string, payload: T1, type: ApiService, options?: AxiosRequestConfig): Promise<T2> {
    return axios
      .patch<T1, AxiosResponse<T2>>(apiServiceUrls[type] + url, payload, options)
      .then(extractData)
      .catch(processError)
  }

  protected put<T1, T2>(url: string, payload: T1, type: ApiService, options?: AxiosRequestConfig): Promise<T2> {
    return axios
      .put<T1, AxiosResponse<T2>>(apiServiceUrls[type] + url, payload, options)
      .then(extractData)
      .catch(processError)
  }

  protected delete<T>(url: string, type: ApiService, options?: AxiosRequestConfig) {
    return axios
      .delete<T>(apiServiceUrls[type] + url, options)
      .then(extractData)
      .catch(processError)
  }
}

function extractData<T = any>(response: AxiosResponse<T>) {
  const { data, status } = response
  if (status !== 200) {
    const errorMessage = (data as any).errorMessage
    if (errorMessage) {
      throw new ApiError(errorMessage, data)
    }
  }
  return data
}

function processError(err: AxiosError): never {
  const data: any = err.response?.data
  const errorMessage = data?.error || data?.errorMessage
  throw new ApiError(errorMessage, err.response?.data || null)
}
