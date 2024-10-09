import { Field, PublicKey, fetchAccount } from 'o1js';

import type {
    WorkerFunctions,
    ZkappWorkerReponse,
    ZkappWorkerRequest,
} from './zkappWorker';

export default class ZkappWorkerClient {
    // ---------------------------------------------------------------------------------------

    setActiveInstanceToDevnet() {
        return this._call('setActiveInstanceToDevnet', {});
    }

    loadContract() {
        return this._call('loadContract', {});
    }

    compileContract() {
        return this._call('compileContract', {});
    }

    fetchAccount({
        publicKey,
    }: {
        publicKey: PublicKey;
    }): ReturnType<typeof fetchAccount> {
        const result = this._call('fetchAccount', {
            publicKey58: publicKey.toBase58(),
        });
        return result as ReturnType<typeof fetchAccount>;
    }

    initZkappInstance(publicKey: PublicKey) {
        return this._call('initZkappInstance', {
            publicKey58: publicKey.toBase58(),
        });
    }

    async getRoot(): Promise<Field> {
        const result = await this._call('getRoot', {});
        console.log(result);
        return Field.fromJSON(JSON.parse(result as string));
    }

    async setRoot(commitment: Field) {
        debugger
        return this._call('setRoot', {
            commitment: JSON.stringify(commitment.toJSON()),
        });
    }

    async isMember({ proof, key }: { proof: any; key: any }) {
        return this._call('isMember', {
            proof: JSON.stringify(proof),
            key: JSON.stringify(key),
        });
    }


    async proveUpdateTransaction() {
        return this._call('proveUpdateTransaction', {});
    }

    async getTransactionJSON() {
        const result = await this._call('getTransactionJSON', {});
        return result;
    }

    // ---------------------------------------------------------------------------------------

    worker: Worker;

    promises: {
        [id: number]: { resolve: (res: any) => void; reject: (err: any) => void };
    };

    nextId: number;

    constructor() {
        this.worker = new Worker(new URL('./zkappWorker.ts', import.meta.url));
        this.promises = {};
        this.nextId = 0;

        this.worker.onmessage = (event: MessageEvent<ZkappWorkerReponse>) => {
            this.promises[event.data.id].resolve(event.data.data);
            delete this.promises[event.data.id];
        };
    }

    _call(fn: WorkerFunctions, args: any) {
        return new Promise((resolve, reject) => {
            this.promises[this.nextId] = { resolve, reject };

            const message: ZkappWorkerRequest = {
                id: this.nextId,
                fn,
                args,
            };

            this.worker.postMessage(message);

            this.nextId++;
        });
    }
}