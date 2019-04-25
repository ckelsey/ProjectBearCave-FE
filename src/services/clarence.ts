import { ClarencePopup } from '../animations'

class Clarence {

    public static animations: { [key: string]: (ctx: CanvasRenderingContext2D) => CanvasRenderingContext2D } = {
        popup: ClarencePopup
    }

    public static animate(ctx: CanvasRenderingContext2D, animation: string) {
        this.animations[animation](ctx)
    }
}

export default Clarence
