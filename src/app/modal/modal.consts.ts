import { InjectionToken } from "@angular/core";
import { ModalIfc } from "./modal.interfaces";

export const ModalToken = new InjectionToken<ModalIfc>('ModalIfc');