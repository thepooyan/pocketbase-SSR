/// <reference types="@solidjs/start/env" />
import PocketBase from 'pocketbase';

declare module App {
  interface RequestEventLocals {
    pb: PocketBase
  }
}
