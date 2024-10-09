import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AdminIcon, HomeIcon, SpaceShipIcon } from './Icon';
import { State } from './StateManager';
import { MyMerkleWitness } from 'membership-zk';
import { Bool, MerkleTree, Poseidon, PrivateKey, PublicKey } from 'o1js';

interface StarryBackgroundProps {
    state: State;
    account: string;
    children?: React.ReactNode;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ state, account, children }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isButtonMoved, setIsButtonMoved] = useState(false);
    const [isOpenGate, setIsOpenGate] = useState(false);
    const iconRef = useRef<HTMLDivElement>(null);
    const [isLanding, setIsLanding] = useState(false)
    const [movingShip, setMovingShip] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const stars: Star[] = [];
        const starCount = 100;
        const connectionDistance = 150;

        class Star {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }

            update(width: number, height: number) {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > width) this.speedX *= -1;
                if (this.y < 0 || this.y > height) this.speedY *= -1;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            if (canvas) {
                const { width, height } = canvas;
                for (let i = 0; i < starCount; i++) {
                    stars.push(new Star(width, height));
                }
            }
        }

        function connectStars(ctx: CanvasRenderingContext2D) {
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / connectionDistance})`;
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
                ctx.fillStyle = '#4B0082';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                for (const star of stars) {
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

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    useEffect(() => {
        // setTimeout(() => {
        //     setIsOpenGate(true);
        //     iconRef.current?.classList.remove('open-gate');
        // }, 20000); // 3 seconds for the gate opening animation
        setMovingShip(true)
        if (isButtonMoved && iconRef.current) {
            iconRef.current.classList.add('move-icon');
        } else if (iconRef.current) {
            iconRef.current.classList.remove('move-icon');
            setMovingShip(false);
        }
    }, [isButtonMoved]);

    useEffect(() => {
        if (isOpenGate && iconRef.current) {
            iconRef.current.classList.add('open-gate');
            setTimeout(() => {
                setIsOpenGate(false);
                iconRef.current?.classList.remove('open-gate');
            }, 3000); // 3 seconds for the gate opening animation
        }
    }, [isOpenGate]);

    const isMemberOfLand = useCallback(async () => {
        debugger
        if (state && state.zkappWorkerClient) {
            const Tree = new MerkleTree(8);

            console.log('@@@@@@@@@@@@', account);
            // Add some addresses to the Merkle Tree
            let addresses = [
                "B62qiVmjkRqnFoQEBRtBs7jsFQq43f4FkPtNFvt3VM7xmtU7oxgox5R", "B62qro7UZZAGFdKEHvgLSrcGh8FQejDwJiw1N5jKkGQpqfocu8dMt9z",
                "B62qp5mEnmEfaKhxKi8FcbcmXc6wjFzpQLnHJsDpytxi66R6YRmMVEc",
                "B62qoWswa1b4Fr6iiT9XfpT6kEH5fgCkPRfZhCwkdspN3WvEfZ362Qi",
                "B62qp1pkE3xP6cMhj2MG5pT32yLHDv6S9CqwCwuQSFjGY6jkbph8qUV",
                "B62qjwsyBfqQi86ErgVN5pTemqx99xEdGRt2s6yJy1YuEFjChZ7uoy5"
            ]
            addresses.forEach((address, index) => {

                const indBn = BigInt(index);
                Tree.setLeaf(indBn, Poseidon.hash(PublicKey.fromBase58(address).toFields()));
            });
            let proof = new MyMerkleWitness(Tree.getWitness(0n));
            await state.zkappWorkerClient!.fetchAccount({
                publicKey: state.zkappPublicKey!,
            });
            const key = PrivateKey.fromBase58('EKFF8DqaDvJ61dcofJcv2NqzY6D3BLtYFjq4aW47fkaY12R3Be6j');
            let memberData = await state.zkappWorkerClient!.isMember({ proof, key });
            if (memberData) {
                const isMember = Boolean(memberData);
                console.log("🚀 ~ isMemberOfLand ~ isMember:", isMember)
                setIsLanding(true);
            }
        }

    }, [state, account])

    return (
        <>
            <canvas ref={canvasRef} className="fixed top-0 left-0 z-[-1]" />
            <div className="absolute top-0 left-0 w-full h-full z-auto">
                <div
                    ref={iconRef}
                    className={`absolute top-4 left-4 transition-all duration-500 ease-in-out ${isButtonMoved ? 'move-icon' : ''} ${isOpenGate ? 'open-gate' : ''}`}
                >
                    <SpaceShipIcon />
                </div>
                <button
                    className="absolute top-4 left-4"
                    onClick={() => {
                        isMemberOfLand()
                        setIsButtonMoved(!isButtonMoved);
                        setIsOpenGate(true);
                    }}
                >
                    {isButtonMoved ? <AdminIcon /> : <SpaceShipIcon />}
                    {isLanding && <HomeIcon />}
                </button>
                {children}
            </div>
        </>
    );
};

export default StarryBackground;