import axios, { AxiosPromise, AxiosResponse } from "axios";

export interface ISyncableObject {
  data: any;
  get(propName: string): string | number | undefined;
  set(newProps: any): void; // TODO: убрать any
}

export class ApiSync<T> {
  constructor(public url: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.url}/${id}`);

    // TODO: как понять, когда возвращаем response?
  }

  save(data: T): AxiosPromise {
    const id: number | undefined = data["id"];
    if (id) {
      return axios.put(`${this.url}/${id}`, data);
    } else {
      return axios.post(`${this.url}`, data);
    }
  }
}
