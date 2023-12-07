import { getBodyStyle, getRootStyle } from './style';

const ATTRIBUTE_KEY = 'data-konomi-ui-overlay';
const ATTRIBUTE_SHOWN = 'data-shown';

export class Overlay {
  protected readonly _root: HTMLDivElement;
  protected _shown: boolean;
  protected _disableBeforeUnload: boolean;

  public constructor() {
    this._shown = false;
    this._disableBeforeUnload = false;

    const root = document.createElement('div');
    this._root = root;
    this._root.classList.add(getRootStyle());
    document.body.classList.add(getBodyStyle());
    this._root.setAttribute(ATTRIBUTE_KEY, '');
    document.body.append(root);
  }

  public show(): void {
    this._shown = true;
    this._root.setAttribute(ATTRIBUTE_SHOWN, '');
    document.body.setAttribute(ATTRIBUTE_KEY, '');
    window.addEventListener('beforeunload', this.beforeunload);
    this.render();
  }

  public hide(): void {
    this._shown = false;
    this._root.removeAttribute(ATTRIBUTE_SHOWN);
    document.body.removeAttribute(ATTRIBUTE_KEY);
    window.removeEventListener('beforeunload', this.beforeunload);
    this.render();
  }

  protected render(): void {}

  /** JavaScript中にページを離れようとした場合にアラートを表示します */
  private beforeunload(event: BeforeUnloadEvent): void {
    event.preventDefault();
    event.returnValue = '';
  }

  /** @deprecated このメソッドは非推奨です。代わりに`show`メソッドを使用してください。 */
  public start(): void {
    this.show();
  }
  /** @deprecated このメソッドは非推奨です。代わりに`hide`メソッドを使用してください。 */
  public stop(): void {
    this.hide();
  }
}
