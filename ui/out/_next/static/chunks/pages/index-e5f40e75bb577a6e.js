(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[405],{

/***/ 3454:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var _global_process, _global_process1;
module.exports = ((_global_process = __webpack_require__.g.process) == null ? void 0 : _global_process.env) && typeof ((_global_process1 = __webpack_require__.g.process) == null ? void 0 : _global_process1.env) === "object" ? __webpack_require__.g.process : __webpack_require__(7663);

//# sourceMappingURL=process.js.map

/***/ }),

/***/ 9208:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/",
      function () {
        return __webpack_require__(8497);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 8497:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Home; }
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
;// CONCATENATED MODULE: ./src/components/UIComponents.tsx


const UIComponents = (param)=>{
    let { state, displayText, transactionlink, account, onSendTransaction, onRefreshCurrentRoot, setMembers } = param;
    const [members, setMembersState] = (0,react.useState)([]);
    const handleMembersChange = (e)=>{
        console.log("e.target.value :>>", e.target.value);
        debugger;
        const cleanedMembers = e.target.value.split(/[\n,]+/) // Split by newline or comma
        .map((item)=>item.trim()).filter(Boolean) // Remove any empty strings
        .map((item)=>item.replace(/\\/g, "").replace(/^"|"$/g, ""));
        setMembersState(cleanedMembers);
    };
    const handleSetMembers = async ()=>{
        if (members.length > 0) {
            await setMembers(members);
        }
    };
    let hasWallet;
    if (state.hasWallet != null && !state.hasWallet) {
        const auroLink = "https://www.aurowallet.com/";
        const auroLinkElem = /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
            href: auroLink,
            target: "_blank",
            rel: "noreferrer",
            className: "text-blue-500 hover:underline",
            children: "Install Auro wallet here"
        });
        hasWallet = /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "text-red-500",
            children: [
                "Could not find a wallet. ",
                auroLinkElem
            ]
        });
    }
    const stepDisplay = transactionlink ? /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
        href: transactionlink,
        target: "_blank",
        rel: "noreferrer",
        className: "text-blue-500 hover:underline",
        children: "View transaction"
    }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
        className: "",
        children: displayText
    });
    let setup = /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "text-xl font-bold mb-8 text-center",
        children: [
            stepDisplay,
            hasWallet
        ]
    });
    let accountDoesNotExist;
    if (state.hasBeenSetup && !state.accountExists) {
        const faucetLink = "https://faucet.minaprotocol.com/?address=" + state.publicKey.toBase58();
        accountDoesNotExist = /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "mt-4 text-center",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                    className: "mr-2",
                    children: "Account does not exist."
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                    href: faucetLink,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "text-blue-500 hover:underline",
                    children: "Visit the faucet to fund this fee payer account"
                })
            ]
        });
    }
    let mainContent;
    if (state.hasBeenSetup && state.accountExists) {
        //{`${account.slice(0, 6)}...${account.slice(-4)}`}
        mainContent = /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "flex flex-col items-center space-y-4 text-white",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    children: [
                        "Connected account ",
                        account
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    children: displayText
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    children: [
                        "Current root in zkApp: ",
                        state.currentRoot.toString()
                    ]
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "flex flex-col   justify-self-start   min-h-screen p-4 text-white",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "text-top-10",
            children: [
                setup,
                accountDoesNotExist,
                mainContent
            ]
        })
    });
};
/* harmony default export */ var components_UIComponents = (UIComponents);

// EXTERNAL MODULE: ./node_modules/o1js/dist/web/index.js
var web = __webpack_require__(9466);
;// CONCATENATED MODULE: ./src/components/TransactionHandler.tsx
// TransactionHandler.tsx


const transactionFee = 0.1;
const TransactionHandler = (param)=>{
    let { state, setDisplayText, setTransactionLink } = param;
    const [creatingTransaction, setCreatingTransaction] = (0,react.useState)(false);
    const onSendTransaction = async ()=>{
        setCreatingTransaction(true);
        setDisplayText("Creating a transaction...");
        console.log("Creating a transaction...");
        await state.zkappWorkerClient.fetchAccount({
            publicKey: state.publicKey
        });
        setDisplayText("Creating proof...");
        console.log("Creating proof...");
        await state.zkappWorkerClient.proveUpdateTransaction();
        console.log("Requesting send transaction...");
        setDisplayText("Requesting send transaction...");
        const transactionJSON = await state.zkappWorkerClient.getTransactionJSON();
        setDisplayText("Getting transaction JSON...");
        console.log("Getting transaction JSON...");
        const { hash } = await window.mina.sendTransaction({
            transaction: transactionJSON,
            feePayer: {
                fee: transactionFee,
                memo: ""
            }
        });
        const transactionLink = "https://minascan.io/devnet/tx/".concat(hash);
        console.log("View transaction at ".concat(transactionLink));
        setTransactionLink(transactionLink);
        setDisplayText(transactionLink);
        setCreatingTransaction(false);
    };
    const onRefreshCurrentRoot = async ()=>{
        console.log("Getting zkApp state...");
        setDisplayText("Getting zkApp state...");
        await state.zkappWorkerClient.fetchAccount({
            publicKey: state.zkappPublicKey
        });
        const currentRoot = await state.zkappWorkerClient.getRoot();
        console.log("\uD83D\uDE80 ~ onRefreshCurrentRoot ~ currentRoot:", currentRoot);
        setDisplayText("");
        return; // Return void instead of Field
    };
    const setMembers = async (members)=>{
        console.log("Getting zkApp state...");
        setDisplayText("Getting zkApp state...");
        await state.zkappWorkerClient.fetchAccount({
            publicKey: state.zkappPublicKey
        });
        const Tree = new web/* MerkleTree */.MV(8);
        const membersAddresses = members.map((member)=>web/* PublicKey */.nh.fromBase58(member));
        console.log("\uD83D\uDE80 ~ setMembers ~ membersAddresses:", membersAddresses);
        let addresses = membersAddresses.map((account)=>account);
        addresses.forEach((address, index)=>{
            const indBn = BigInt(index);
            Tree.setLeaf(indBn, web/* Poseidon */.jm.hash(address.toFields()));
        });
        const tx = await web/* Mina */.No.transaction(async ()=>{
            await state.zkappWorkerClient.setRoot(Tree.getRoot());
        });
        await tx.prove();
        const { hash } = await window.mina.sendTransaction({
            transaction: tx.toJSON(),
            feePayer: {
                fee: "",
                memo: "zk"
            }
        });
        console.log(hash);
        const transactionLink = "https://minascan.io/devnet/tx/".concat(hash);
        console.log("View transaction at ".concat(transactionLink));
        setTransactionLink(transactionLink);
        setDisplayText(transactionLink);
        setCreatingTransaction(false);
        const newMembers = await state.zkappWorkerClient.setRoot(Tree.getRoot());
        console.log("\uD83D\uDE80 ~ setMembers ~ newMembers:", newMembers);
        const currentRoot = await state.zkappWorkerClient.getRoot();
        console.log("\uD83D\uDE80 ~ onRefreshCurrentRoot ~ currentRoot:", currentRoot);
        setDisplayText("");
        return; // Return void instead of Field
    };
    return {
        onSendTransaction,
        onRefreshCurrentRoot,
        setMembers,
        creatingTransaction
    };
};
/* harmony default export */ var components_TransactionHandler = (TransactionHandler);

;// CONCATENATED MODULE: ./src/pages/zkappWorkerClient.ts

class ZkappWorkerClient {
    // ---------------------------------------------------------------------------------------
    setActiveInstanceToDevnet() {
        return this._call("setActiveInstanceToDevnet", {});
    }
    loadContract() {
        return this._call("loadContract", {});
    }
    compileContract() {
        return this._call("compileContract", {});
    }
    fetchAccount(param) {
        let { publicKey } = param;
        const result = this._call("fetchAccount", {
            publicKey58: publicKey.toBase58()
        });
        return result;
    }
    initZkappInstance(publicKey) {
        return this._call("initZkappInstance", {
            publicKey58: publicKey.toBase58()
        });
    }
    async getRoot() {
        const result = await this._call("getRoot", {});
        console.log(result);
        return web/* Field */.gN.fromJSON(JSON.parse(result));
    }
    async setRoot(commitment) {
        debugger;
        return this._call("setRoot", {
            commitment: JSON.stringify(commitment.toJSON())
        });
    }
    async isMember(param) {
        let { proof, key } = param;
        return this._call("isMember", {
            proof: JSON.stringify(proof),
            key: JSON.stringify(key)
        });
    }
    async proveUpdateTransaction() {
        return this._call("proveUpdateTransaction", {});
    }
    async getTransactionJSON() {
        const result = await this._call("getTransactionJSON", {});
        return result;
    }
    _call(fn, args) {
        return new Promise((resolve, reject)=>{
            this.promises[this.nextId] = {
                resolve,
                reject
            };
            const message = {
                id: this.nextId,
                fn,
                args
            };
            this.worker.postMessage(message);
            this.nextId++;
        });
    }
    constructor(){
        this.worker = new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(119), __webpack_require__.b)));
        this.promises = {};
        this.nextId = 0;
        this.worker.onmessage = (event)=>{
            this.promises[event.data.id].resolve(event.data.data);
            delete this.promises[event.data.id];
        };
    }
}


;// CONCATENATED MODULE: ./src/components/StateManager.tsx
// StateManager.tsx



const initialState = {
    zkappWorkerClient: null,
    hasWallet: null,
    hasBeenSetup: false,
    accountExists: false,
    currentRoot: null,
    publicKey: null,
    zkappPublicKey: null,
    creatingTransaction: false
};
const ZKAPP_ADDRESS = "B62qjwsyBfqQi86ErgVN5pTemqx99xEdGRt2s6yJy1YuEFjChZ7uoy5";
const StateManager = (param)=>{
    let { setDisplayText, setAccount, setTransactionLink } = param;
    const [state, setState] = (0,react.useState)(initialState);
    (0,react.useEffect)(()=>{
        async function timeout(seconds) {
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve();
                }, seconds * 1000);
            });
        }
        (async ()=>{
            if (!state.hasBeenSetup) {
                setDisplayText("Loading web worker...");
                console.log("Loading web worker...");
                const zkappWorkerClient = new ZkappWorkerClient();
                await timeout(5);
                setDisplayText("Done loading web worker");
                console.log("Done loading web worker");
                await zkappWorkerClient.setActiveInstanceToDevnet();
                const mina = window.mina;
                if (mina == null) {
                    setState({
                        ...state,
                        hasWallet: false
                    });
                    return;
                }
                const publicKeyBase58 = (await mina.requestAccounts())[0];
                setAccount(publicKeyBase58);
                const publicKey = web/* PublicKey */.nh.fromBase58(publicKeyBase58);
                console.log("Using key:".concat(publicKey.toBase58()));
                setDisplayText("Using key:".concat(publicKey.toBase58()));
                setDisplayText("Checking if fee payer account exists...");
                console.log("Checking if fee payer account exists...");
                const res = await zkappWorkerClient.fetchAccount({
                    publicKey: publicKey
                });
                const accountExists = res.error == null;
                await zkappWorkerClient.loadContract();
                console.log("Compiling zkApp...");
                setDisplayText("Compiling zkApp...");
                await zkappWorkerClient.compileContract();
                console.log("zkApp compiled");
                setDisplayText("zkApp compiled...");
                const zkappPublicKey = web/* PublicKey */.nh.fromBase58(ZKAPP_ADDRESS);
                await zkappWorkerClient.initZkappInstance(zkappPublicKey);
                console.log("Getting zkApp state...");
                setDisplayText("Getting zkApp state...");
                await zkappWorkerClient.fetchAccount({
                    publicKey: zkappPublicKey
                });
                const currentRoot = await zkappWorkerClient.getRoot();
                console.log("\uD83D\uDE80 ~ currentRoot:", currentRoot);
                console.log("Current state in zkApp: ".concat(currentRoot.toString()));
                setDisplayText("");
                setState({
                    ...state,
                    zkappWorkerClient,
                    hasWallet: true,
                    hasBeenSetup: true,
                    publicKey,
                    zkappPublicKey,
                    accountExists,
                    currentRoot
                });
            }
        })();
    }, [
        state.hasBeenSetup
    ]);
    (0,react.useEffect)(()=>{
        (async ()=>{
            if (state.hasBeenSetup && !state.accountExists) {
                for(;;){
                    setDisplayText("Checking if fee payer account exists...");
                    console.log("Checking if fee payer account exists...");
                    const res = await state.zkappWorkerClient.fetchAccount({
                        publicKey: state.publicKey
                    });
                    const accountExists = res.error == null;
                    if (accountExists) {
                        break;
                    }
                    await new Promise((resolve)=>setTimeout(resolve, 5000));
                }
                setState({
                    ...state,
                    accountExists: true
                });
            }
        })();
    }, [
        state.hasBeenSetup
    ]);
    return state;
};
/* harmony default export */ var components_StateManager = (StateManager);

;// CONCATENATED MODULE: ./src/components/CanvasBackground.tsx


const CanvasBackground = ()=>{
    const canvasRef = (0,react.useRef)(null);
    (0,react.useEffect)(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let animationFrameId;
        const stars = [];
        const starCount = 100;
        const connectionDistance = 150;
        class Star {
            update(width, height) {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > width) this.speedX *= -1;
                if (this.y < 0 || this.y > height) this.speedY *= -1;
            }
            draw(ctx) {
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            constructor(width, height){
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
        }
        function init() {
            if (canvas) {
                const { width, height } = canvas;
                for(let i = 0; i < starCount; i++){
                    stars.push(new Star(width, height));
                }
            }
        }
        function connectStars(ctx) {
            for(let i = 0; i < stars.length; i++){
                for(let j = i + 1; j < stars.length; j++){
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < connectionDistance) {
                        ctx.strokeStyle = "rgba(255, 255, 255, ".concat(1 - distance / connectionDistance, ")");
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(stars[i].x, stars[i].y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        function animate() {
            if (ctx && canvas) {
                ctx.fillStyle = "#4B0082";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                for (const star of stars){
                    star.update(canvas.width, canvas.height);
                    star.draw(ctx);
                }
                connectStars(ctx);
                animationFrameId = requestAnimationFrame(animate);
            }
        }
        function resizeCanvas() {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        init();
        animate();
        return ()=>{
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("canvas", {
        ref: canvasRef,
        className: "fixed top-0 left-0 z-[-1]"
    });
};
/* harmony default export */ var components_CanvasBackground = (CanvasBackground);

;// CONCATENATED MODULE: ./src/components/Icon.tsx

const AdminIcon = ()=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "white",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "w-6 h-6",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M12 4c2.76 0 5.22 1.12 7.01 2.92L12 13.83l-7-6.93C6.79 5.11 9.24 4 12 4z"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M19.01 6.92C20.27 8.38 21 10.12 21 12c0 4.97-4.03 9-9 9-2.76 0-5.22-1.12-7.01-2.92L12 13.17l7 6.93C17.21 18.89 14.76 20 12 20c-4.41 0-8-3.59-8-8 0-1.88.73-3.62 1.99-5.08L12 13.83V4c2.76 0 5.22 1.12 7.01 2.92z"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M12 13.83l-7-6.93C6.79 5.11 9.24 4 12 4v9.83z"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M12 16c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M12 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
            })
        ]
    });
const SpaceShipIcon = ()=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        version: "1.1",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32",
        preserveAspectRatio: "xMidYMid meet",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("defs", {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("g", {
                style: {
                    stroke: "none",
                    strokeWidth: "0",
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: "10",
                    fill: "none",
                    fillRule: "nonzero",
                    opacity: "1"
                },
                transform: "translate(1.4065934065934016 1.4065934065934016) scale(0.35125 0.35125)",
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                    d: "M 89.983 5.63 c -0.006 -0.267 -0.016 -0.534 -0.026 -0.802 c -0.011 -0.299 -0.02 -0.597 -0.036 -0.897 c -0.031 -0.602 -0.07 -1.207 -0.121 -1.814 c -0.081 -0.973 -0.854 -1.745 -1.827 -1.827 c -0.607 -0.051 -1.21 -0.089 -1.811 -0.121 c -0.305 -0.016 -0.607 -0.025 -0.909 -0.036 c -0.262 -0.009 -0.525 -0.02 -0.786 -0.025 c -0.437 -0.01 -0.871 -0.013 -1.304 -0.013 c -0.072 0 -0.145 0 -0.217 0.001 c -8.628 0.042 -16.548 2.16 -24.544 6.526 C 58.261 6.7 58.12 6.773 57.979 6.85 c -0.05 0.028 -0.099 0.052 -0.149 0.08 c -0.011 0.006 -0.02 0.016 -0.031 0.022 c -6.556 3.654 -13.101 8.811 -19.875 15.585 c -0.77 0.77 -1.523 1.55 -2.268 2.334 l -13.164 1.001 c -0.385 0.029 -0.753 0.169 -1.06 0.402 L 0.785 41.987 c -0.657 0.5 -0.94 1.352 -0.711 2.145 c 0.228 0.793 0.92 1.364 1.742 1.439 l 19.373 1.749 l 6.134 6.134 c -2.174 0.497 -4.389 1.715 -6.286 3.611 c -1.136 1.137 -2.048 2.411 -2.716 3.803 c -0.873 1.849 -2.79 6.61 -4.82 11.651 l -0.991 2.459 c -0.3 0.744 -0.127 1.595 0.441 2.162 c 0.382 0.383 0.894 0.586 1.415 0.586 c 0.251 0 0.505 -0.048 0.748 -0.146 l 2.547 -1.027 c 5 -2.014 9.723 -3.917 11.576 -4.79 c 1.38 -0.664 2.655 -1.576 3.79 -2.711 c 1.896 -1.896 3.113 -4.111 3.61 -6.285 l 5.952 5.952 l 1.749 19.372 c 0.074 0.822 0.646 1.514 1.439 1.742 c 0.183 0.053 0.369 0.078 0.553 0.078 c 0.614 0 1.207 -0.283 1.592 -0.789 l 15.711 -20.646 c 0.233 -0.307 0.373 -0.675 0.402 -1.06 l 0.971 -12.775 c 0.857 -0.811 1.706 -1.635 2.547 -2.475 c 6.779 -6.779 11.939 -13.327 15.594 -19.887 c 0.004 -0.007 0.01 -0.013 0.014 -0.02 c 0.018 -0.032 0.033 -0.063 0.051 -0.095 c 0.167 -0.301 0.326 -0.602 0.486 -0.904 c 4.207 -7.847 6.251 -15.635 6.295 -24.099 c 0.001 -0.083 0.001 -0.165 0.001 -0.248 C 89.996 6.488 89.993 6.06 89.983 5.63 z M 64.413 37.493 c -1.577 1.577 -3.675 2.447 -5.907 2.447 c -2.231 0 -4.329 -0.869 -5.907 -2.447 c -3.257 -3.258 -3.257 -8.557 0 -11.815 v 0 c 3.259 -3.257 8.559 -3.255 11.814 0 c 1.578 1.577 2.448 3.675 2.448 5.907 S 65.992 35.915 64.413 37.493 z",
                    style: {
                        stroke: "none",
                        strokeWidth: "1",
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: "10",
                        fill: "rgb(255,255,255)",
                        fillRule: "nonzero",
                        opacity: "1"
                    },
                    transform: " matrix(1 0 0 1 0 0) ",
                    strokeLinecap: "round"
                })
            })
        ]
    });
const HomeIcon = ()=>/*#__PURE__*/ _jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "w-6 h-6",
        children: /*#__PURE__*/ _jsx("path", {
            d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        })
    });
const PlanetIcon = ()=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        version: "1.1",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32",
        preserveAspectRatio: "xMidYMid meet",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("defs", {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("radialGradient", {
                        id: "planetAtmosphere",
                        cx: "50%",
                        cy: "50%",
                        r: "50%",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("stop", {
                                offset: "85%",
                                stopColor: "#4A90E2",
                                stopOpacity: "0.6"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("stop", {
                                offset: "100%",
                                stopColor: "#4A90E2",
                                stopOpacity: "0"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("linearGradient", {
                        id: "landGradient",
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("stop", {
                                offset: "0%",
                                stopColor: "#2E7D32"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("stop", {
                                offset: "100%",
                                stopColor: "#1B5E20"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("g", {
                style: {
                    stroke: "none",
                    strokeWidth: "0",
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: "10",
                    fill: "none",
                    fillRule: "nonzero",
                    opacity: "1"
                },
                transform: "translate(1.4065934065934016 1.4065934065934016) scale(0.35125 0.35125)",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("circle", {
                        cx: "45",
                        cy: "45",
                        r: "42",
                        fill: "#1565C0",
                        style: {
                            stroke: "none",
                            opacity: "1"
                        }
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("circle", {
                        cx: "45",
                        cy: "45",
                        r: "44",
                        fill: "url(#planetAtmosphere)",
                        style: {
                            stroke: "none",
                            opacity: "0.5"
                        }
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                        d: "M 35.2 20.5 c 3.8-2.1 8.5-1.8 12.3 0.2 c 2.8 1.5 5.2 3.8 7.1 6.3 c 2.4 3.2 4.1 6.9 5.1 10.8 c 0.7 2.8 1 5.7 0.8 8.6 c -0.2 3.9-1.3 7.7-3.2 11.1 c -1.5 2.7-3.6 5-6.2 6.7 c -2.6 1.7-5.6 2.7-8.7 2.9 c -3.1 0.2-6.2-0.4-9-1.8 c -2.8-1.4-5.2-3.6-7-6.2 c -1.8-2.6-3-5.6-3.5-8.7 c -0.5-3.1-0.3-6.3 0.6-9.3 c 0.9-3 2.5-5.8 4.7-8.1 C 30.5 24.4 32.7 22.1 35.2 20.5 z",
                        fill: "url(#landGradient)",
                        style: {
                            stroke: "none",
                            opacity: "0.9"
                        }
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                        d: "M 65 40 c 2.1-1.2 4.7-1 6.8 0.1 c 1.5 0.8 2.9 2.1 3.9 3.5 c 1.3 1.8 2.3 3.8 2.8 6 c 0.4 1.5 0.6 3.2 0.4 4.8 c -0.1 2.2-0.7 4.3-1.8 6.2",
                        fill: "url(#landGradient)",
                        style: {
                            stroke: "none",
                            opacity: "0.85"
                        }
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                        d: "M 25 60 c 1.5-0.8 3.3-0.7 4.8 0.1 c 1.1 0.6 2 1.5 2.8 2.5 c 0.9 1.3 1.6 2.7 2 4.2 c 0.3 1.1 0.4 2.2 0.3 3.4",
                        fill: "url(#landGradient)",
                        style: {
                            stroke: "none",
                            opacity: "0.85"
                        }
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("circle", {
                        cx: "45",
                        cy: "45",
                        r: "42",
                        fill: "none",
                        style: {
                            stroke: "#ffffff",
                            strokeWidth: "0.5",
                            opacity: "0.3"
                        }
                    })
                ]
            })
        ]
    });

;// CONCATENATED MODULE: ./src/components/SpaceShipIconContainer.tsx



const SpaceShipIconContainer = (param)=>{
    let { isButtonMoved, isOpenGate } = param;
    const iconRef = (0,react.useRef)(null);
    const [movingShip, setMovingShip] = (0,react.useState)(false);
    (0,react.useEffect)(()=>{
        setMovingShip(true);
        if (isButtonMoved && iconRef.current) {
            iconRef.current.classList.add("move-icon");
        } else if (iconRef.current) {
            iconRef.current.classList.remove("move-icon");
            setMovingShip(false);
        }
    }, [
        isButtonMoved
    ]);
    (0,react.useEffect)(()=>{
        if (isOpenGate && iconRef.current) {
            iconRef.current.classList.add("open-gate");
            setTimeout(()=>{
                var _iconRef_current;
                (_iconRef_current = iconRef.current) === null || _iconRef_current === void 0 ? void 0 : _iconRef_current.classList.remove("open-gate");
            }, 3000); // 3 seconds for the gate opening animation
        }
    }, [
        isOpenGate
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        ref: iconRef,
        className: "absolute top-4 left-4 transition-all duration-500 ease-in-out ".concat(isButtonMoved ? "move-icon" : "", " ").concat(isOpenGate ? "open-gate" : ""),
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(SpaceShipIcon, {})
    });
};
/* harmony default export */ var components_SpaceShipIconContainer = (SpaceShipIconContainer);

;// CONCATENATED MODULE: ./src/components/Planet.tsx



const Planet = (param)=>{
    let { className } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: className,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(PlanetIcon, {})
    });
};
/* harmony default export */ var components_Planet = (Planet);

;// CONCATENATED MODULE: ./src/components/PlanetIconContainer.tsx



const PlanetIconContainer = (param)=>{
    let { isOpenGate } = param;
    return isOpenGate ? /*#__PURE__*/ (0,jsx_runtime.jsx)(components_Planet, {
        className: "planet-icon"
    }) : null;
};
/* harmony default export */ var components_PlanetIconContainer = (PlanetIconContainer);

;// CONCATENATED MODULE: ./src/components/MovingSpaceShipIcon.tsx



const MovingSpaceShipIcon = (param)=>{
    let { numberShip } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "moving-space-ship-".concat(numberShip),
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(SpaceShipIcon, {})
    });
};
/* harmony default export */ var components_MovingSpaceShipIcon = (MovingSpaceShipIcon);

;// CONCATENATED MODULE: ./src/components/MovingSpaceShipIcons.tsx



const MovingSpaceShipIcons = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(components_MovingSpaceShipIcon, {
                numberShip: 1
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(components_MovingSpaceShipIcon, {
                numberShip: 2
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(components_MovingSpaceShipIcon, {
                numberShip: 3
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(components_MovingSpaceShipIcon, {
                numberShip: 4
            })
        ]
    });
};
/* harmony default export */ var components_MovingSpaceShipIcons = (MovingSpaceShipIcons);

;// CONCATENATED MODULE: ./src/components/MemberMessage.tsx


const MemberMessage = (param)=>{
    let { memberData } = param;
    const message = memberData ? "Welcome to the Mina Universe! Your spaceship has access to our universe!" : "You are not a member of Mina Universe! Access denied for your spaceship!";
    const pulseClass = memberData ? "pulse-green" : "pulse-red";
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "member-message ".concat(pulseClass),
        children: message
    });
};
/* harmony default export */ var components_MemberMessage = (MemberMessage);

;// CONCATENATED MODULE: ./node_modules/membership-zk/build/src/Membership.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class MyMerkleWitness extends (0,web/* MerkleWitness */.Pj)(8) {
}
class Membership extends web/* SmartContract */.C3 {
    constructor() {
        super(...arguments);
        this.commitment = (0,web/* State */.ZM)();
        this.adminPublicKey = (0,web/* State */.ZM)();
    }
    async init() {
        super.init();
        this.commitment.set((0,web/* Field */.gN)(0));
    }
    async initState() {
        const emptyTreeRoot = new web/* MerkleTree */.MV(8).getRoot();
        this.commitment.set(emptyTreeRoot);
    }
    async getRoot() {
        this.commitment.requireEquals(this.commitment.get());
        return this.commitment.get();
    }
    async setRoot(commitment) {
        this.commitment.set(commitment);
    }
    async isMember(proof, memberPublicKey) {
        let commitment = this.commitment.get();
        this.commitment.requireEquals(commitment);
        let addressHash = web/* Poseidon */.jm.hash(memberPublicKey.toFields());
        let calculatedRoot = proof.calculateRoot(addressHash);
        return calculatedRoot.equals(commitment);
    }
}
__decorate([
    (0,web/* state */.SB)(web/* Field */.gN),
    __metadata("design:type", Object)
], Membership.prototype, "commitment", void 0);
__decorate([
    (0,web/* state */.SB)(web/* PublicKey */.nh),
    __metadata("design:type", Object)
], Membership.prototype, "adminPublicKey", void 0);
__decorate([
    web/* method */.UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Membership.prototype, "init", null);
__decorate([
    web/* method */.UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Membership.prototype, "initState", null);
__decorate([
    web/* method */.UD.returns(web/* Field */.gN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Membership.prototype, "getRoot", null);
__decorate([
    web/* method */.UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web/* Field */.gN]),
    __metadata("design:returntype", Promise)
], Membership.prototype, "setRoot", null);
__decorate([
    web/* method */.UD.returns(web/* Bool */.tW),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MyMerkleWitness, web/* PublicKey */.nh]),
    __metadata("design:returntype", Promise)
], Membership.prototype, "isMember", null);
//# sourceMappingURL=Membership.js.map
;// CONCATENATED MODULE: ./node_modules/membership-zk/build/src/index.js


//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./src/components/ ButtonContainer.tsx



const ButtonContainer = (param)=>{
    let { isButtonMoved, isLanding, setIsButtonMoved, setIsOpenGate, isMemberOfLand } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
        className: "absolute top-4 left-4 pulse-green",
        onClick: ()=>{
            isMemberOfLand();
            setIsButtonMoved(!isButtonMoved);
            setIsOpenGate(isButtonMoved);
        },
        children: isButtonMoved ? /*#__PURE__*/ (0,jsx_runtime.jsx)(AdminIcon, {}) : /*#__PURE__*/ (0,jsx_runtime.jsx)(SpaceShipIcon, {})
    });
};
/* harmony default export */ var _ButtonContainer = (ButtonContainer);

;// CONCATENATED MODULE: ./src/components/MinaVerse.tsx










const MinaVerse = (param)=>{
    let { state, account, children } = param;
    const [isButtonMoved, setIsButtonMoved] = (0,react.useState)(false);
    const [isOpenGate, setIsOpenGate] = (0,react.useState)(false);
    const [isLanding, setIsLanding] = (0,react.useState)(false);
    const [memberData, setMemberData] = (0,react.useState)(null);
    const isMemberOfLand = (0,react.useCallback)(async ()=>{
        if (state && state.zkappWorkerClient) {
            const Tree = new web/* MerkleTree */.MV(8);
            const response = await fetch("https://raw.githubusercontent.com/spreadzp/04-zkapp-browser-ui/refs/heads/main/spaceShipsAddresses.json");
            const addresses = await response.json();
            addresses.forEach((address, index)=>{
                const indBn = BigInt(index);
                Tree.setLeaf(indBn, web/* Poseidon */.jm.hash(web/* PublicKey */.nh.fromBase58(address).toFields()));
            });
            let proof = new MyMerkleWitness(Tree.getWitness(0n));
            await state.zkappWorkerClient.fetchAccount({
                publicKey: state.zkappPublicKey
            });
            //const key = PublicKey.fromBase58(account);
            debugger;
            let memberData = await state.zkappWorkerClient.isMember({
                proof,
                key: account
            });
            const isMember = JSON.parse(memberData);
            if (isMember) {
                setMemberData(isMember);
                setIsLanding(isMember);
                setIsOpenGate(isMember); // Trigger the open-gate animation
            } else {
                setMemberData(false);
            }
        }
    }, [
        state,
        account
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(components_CanvasBackground, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "absolute top-0 left-0 w-full h-full z-auto",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(components_SpaceShipIconContainer, {
                        isButtonMoved: isButtonMoved,
                        isOpenGate: isOpenGate
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(_ButtonContainer, {
                        isButtonMoved: isButtonMoved,
                        isLanding: isLanding,
                        setIsButtonMoved: setIsButtonMoved,
                        setIsOpenGate: setIsOpenGate,
                        isMemberOfLand: isMemberOfLand
                    }),
                    memberData && /*#__PURE__*/ (0,jsx_runtime.jsx)(components_PlanetIconContainer, {
                        isOpenGate: isOpenGate
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(components_MovingSpaceShipIcons, {}),
                    memberData !== null && /*#__PURE__*/ (0,jsx_runtime.jsx)(components_MemberMessage, {
                        memberData: memberData
                    }),
                    children
                ]
            })
        ]
    });
};
/* harmony default export */ var components_MinaVerse = (MinaVerse);

;// CONCATENATED MODULE: ./src/pages/index.page.tsx






function Home() {
    const [displayText, setDisplayText] = (0,react.useState)("");
    const [transactionlink, setTransactionLink] = (0,react.useState)("");
    const [account, setAccount] = (0,react.useState)("");
    const state = components_StateManager({
        setDisplayText,
        setAccount,
        setTransactionLink
    });
    const { onSendTransaction, onRefreshCurrentRoot, setMembers, creatingTransaction } = components_TransactionHandler({
        state,
        setDisplayText,
        setTransactionLink
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "flex flex-col items-center justify-center min-h-screen text-white",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(components_MinaVerse, {
            state: state,
            account: account,
            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(components_UIComponents, {
                state: state,
                displayText: displayText,
                transactionlink: transactionlink,
                account: account,
                onSendTransaction: onSendTransaction,
                onRefreshCurrentRoot: onRefreshCurrentRoot,
                setMembers: setMembers
            })
        })
    });
}


/***/ }),

/***/ 7663:
/***/ (function(module) {

var __dirname = "/";
(function(){var e={229:function(e){var t=e.exports={};var r;var n;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){r=setTimeout}else{r=defaultSetTimout}}catch(e){r=defaultSetTimout}try{if(typeof clearTimeout==="function"){n=clearTimeout}else{n=defaultClearTimeout}}catch(e){n=defaultClearTimeout}})();function runTimeout(e){if(r===setTimeout){return setTimeout(e,0)}if((r===defaultSetTimout||!r)&&setTimeout){r=setTimeout;return setTimeout(e,0)}try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}function runClearTimeout(e){if(n===clearTimeout){return clearTimeout(e)}if((n===defaultClearTimeout||!n)&&clearTimeout){n=clearTimeout;return clearTimeout(e)}try{return n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}var i=[];var o=false;var u;var a=-1;function cleanUpNextTick(){if(!o||!u){return}o=false;if(u.length){i=u.concat(i)}else{a=-1}if(i.length){drainQueue()}}function drainQueue(){if(o){return}var e=runTimeout(cleanUpNextTick);o=true;var t=i.length;while(t){u=i;i=[];while(++a<t){if(u){u[a].run()}}a=-1;t=i.length}u=null;o=false;runClearTimeout(e)}t.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1){for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}}i.push(new Item(e,t));if(i.length===1&&!o){runTimeout(drainQueue)}};function Item(e,t){this.fun=e;this.array=t}Item.prototype.run=function(){this.fun.apply(null,this.array)};t.title="browser";t.browser=true;t.env={};t.argv=[];t.version="";t.versions={};function noop(){}t.on=noop;t.addListener=noop;t.once=noop;t.off=noop;t.removeListener=noop;t.removeAllListeners=noop;t.emit=noop;t.prependListener=noop;t.prependOnceListener=noop;t.listeners=function(e){return[]};t.binding=function(e){throw new Error("process.binding is not supported")};t.cwd=function(){return"/"};t.chdir=function(e){throw new Error("process.chdir is not supported")};t.umask=function(){return 0}}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var i=t[r]={exports:{}};var o=true;try{e[r](i,i.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r=__nccwpck_require__(229);module.exports=r})();

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [674,888,774,179], function() { return __webpack_exec__(9208); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);