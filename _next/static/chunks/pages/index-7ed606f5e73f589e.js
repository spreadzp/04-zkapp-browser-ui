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
        return __webpack_require__(1168);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 1168:
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
;// CONCATENATED MODULE: ./src/components/SetMembersForm.tsx


const SetMembersForm = (param)=>{
    let { handleMembersChange, handleSetMembers } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "mt-4",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("textarea", {
                className: "w-full p-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "Enter members (one per line)",
                onChange: handleMembersChange,
                rows: 10
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                className: "mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700",
                onClick: handleSetMembers,
                children: "Set Members"
            })
        ]
    });
};
/* harmony default export */ var components_SetMembersForm = (SetMembersForm);

;// CONCATENATED MODULE: ./src/components/UIComponents.tsx


 // Import the new SetMembersForm component
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
        className: "text-gray-700",
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
        mainContent = /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "flex flex-col items-center space-y-4",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    children: [
                        "Connected account ",
                        "".concat(account.slice(0, 6), "...").concat(account.slice(-4))
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
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                    className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700",
                    onClick: onSendTransaction,
                    disabled: state.creatingTransaction,
                    children: "Send Transaction"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                    className: "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700",
                    onClick: onRefreshCurrentRoot,
                    children: "Get Current Root"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(components_SetMembersForm, {
                    handleMembersChange: handleMembersChange,
                    handleSetMembers: handleSetMembers
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "flex flex-col items-center justify-center min-h-screen p-4",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "text-center",
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

;// CONCATENATED MODULE: ./src/components/StarryBackground.tsx


const StarryBackground = (param)=>{
    let { children } = param;
    const canvasRef = (0,react.useRef)(null);
    const [isButtonMoved, setIsButtonMoved] = (0,react.useState)(false);
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
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("canvas", {
                ref: canvasRef,
                style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: -1
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "z-auto relative",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                        className: "absolute top-4 ".concat(isButtonMoved ? "left-auto right-4" : "left-4", " transition-all duration-500 ease-in-out"),
                        onClick: ()=>setIsButtonMoved(!isButtonMoved),
                        children: isButtonMoved ? "Moved" : "Move"
                    }),
                    children
                ]
            })
        ]
    });
};
/* harmony default export */ var components_StarryBackground = (StarryBackground);

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
        className: "flex flex-col items-center justify-center min-h-screen ",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(components_StarryBackground, {
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