/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/23 PM 5:06:24
 * @filename lw_firewords.d.ts
 * @description 烟花效果JS库的TS类型声明文件
 *
 */

declare module "lw_firewords" {


    interface CircleOptions {

        origin: {

            x: number;
            y: number

        };
        speed: number;
        color: string;
        angle: number;
        context: CanvasRenderingContext2D;

    }


    class Circle {


        constructor(options: CircleOptions);


        draw(): void;


        move(): void;


    }


    interface BoomOptions {


        origin: {

            x: number;
            y: number

        };
        context: CanvasRenderingContext2D;
        circleCount?: number;
        area: {

            width: number;
            height: number
        };


    }


    class Boom {


        constructor(options: BoomOptions);


        init(): void;


        move(): void;


        draw(): void;


        stop: boolean;


    }


    class CursorSpecialEffects {


        constructor();


        init(): void;


        run(): void;


        handleMouseDown(e: MouseEvent): void;


        handlePageHide(): void;


        booms: Boom[];
        running: boolean;


    }


    export default CursorSpecialEffects;


}
