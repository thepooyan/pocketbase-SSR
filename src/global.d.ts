/// <reference types="@solidjs/start/env" />
import PocketBase from 'pocketbase';

declare global {
	namespace App {
		interface RequestEventLocals {
			pb: PocketBase
		}
	}
}
