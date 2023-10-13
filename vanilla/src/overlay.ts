import { css } from '@emotion/css';

export class Overlay {
  protected readonly _root: HTMLDivElement;
  protected _shown: boolean;
  protected _disableBeforeUnload: boolean;

  public constructor() {
    this._shown = false;
    this._disableBeforeUnload = false;

    const root = document.createElement('div');
    this._root = root;
    this._root.classList.add(this.rootClass);
    document.body.append(root);
  }

  public show(): void {
    this._shown = true;
    window.addEventListener('beforeunload', this.beforeunload);
    document.body.style.overflow = 'hidden';
    this.render();
  }

  public hide(): void {
    this._shown = false;
    window.removeEventListener('beforeunload', this.beforeunload);
    document.body.style.overflow = 'auto';
    this.render();
  }

  protected render(): void {
    this._root.style.opacity = this._shown ? '1' : '0';
    this._root.style.pointerEvents = this._shown ? 'all' : 'none';
  }

  /** JavaScript中にページを離れようとした場合にアラートを表示します */
  private beforeunload(event: BeforeUnloadEvent): void {
    event.preventDefault();
    event.returnValue = '';
  }

  private rootClass = css`
    font-family: 'Yu Gothic Medium', '游ゴシック', YuGothic, 'メイリオ', 'Hiragino Kaku Gothic ProN',
      Meiryo, sans-serif;
    color: #356;
    font-size: 14px;

    overflow: hidden;
    background-color: #fffb;
    backdrop-filter: blur(4px);
    box-sizing: content-box;

    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;

    display: grid;
    transition: all 250ms ease;
    z-index: 1000;
    opacity: 0;
    transition: all 250ms ease;

    place-items: end stretch;
    @media (min-width: 640px) {
      font-size: 16px;
      place-items: center;
    }
  `;

  /** @deprecated このメソッドは非推奨です。代わりに`show`メソッドを使用してください。 */
  public start(): void {
    this.show();
  }
  /** @deprecated このメソッドは非推奨です。代わりに`hide`メソッドを使用してください。 */
  public stop(): void {
    this.hide();
  }
}
