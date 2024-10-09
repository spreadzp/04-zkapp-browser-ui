import React, { useEffect, useRef, useState } from 'react';
import { AdminIcon, SpaceShipIcon } from './Icon';

interface StarryBackgroundProps {
    children?: React.ReactNode;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isButtonMoved, setIsButtonMoved] = useState(false);
    const [isOpenGate, setIsOpenGate] = useState(false);
    const iconRef = useRef<HTMLDivElement>(null);

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
        if (isButtonMoved && iconRef.current) {
            iconRef.current.classList.add('move-icon');
        } else if (iconRef.current) {
            iconRef.current.classList.remove('move-icon');
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
                        setIsButtonMoved(!isButtonMoved);
                        setIsOpenGate(true);
                    }}
                >
                    {isButtonMoved ? <AdminIcon /> : <SpaceShipIcon />}
                </button>
                {children}
            </div>
        </>
    );
};

export default StarryBackground;