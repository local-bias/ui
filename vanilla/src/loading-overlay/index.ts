import { Overlay } from '../overlay';
import { containerStyle, loaderStyle, progressStyle } from './style';

type Label = string | string[];
type ConstructorProps = Readonly<Partial<{ label: Label; progress: number }>>;

export class LoadingOverlay extends Overlay {
  #label: Label;
  #html: string;
  #progress: number | null;

  protected readonly _loaderElement: HTMLDivElement;
  protected readonly _progressElement: HTMLDivElement;
  protected readonly _contentElement: HTMLDivElement;

  public constructor(props: ConstructorProps = {}) {
    super();

    this.#label = props.label ?? '';
    this.#html = '';
    this.#progress = props.progress ?? null;

    const container = document.createElement('div');
    container.classList.add(containerStyle);
    this._root.append(container);

    const loaderElement = document.createElement('div');
    loaderElement.innerHTML = '<div><div></div></div>';
    loaderElement.classList.add(loaderStyle);
    this._loaderElement = loaderElement;
    container.append(loaderElement);

    const progressElement = document.createElement('div');
    progressElement.classList.add(progressStyle);
    this._progressElement = progressElement;
    container.append(progressElement);

    const contentElement = document.createElement('div');
    this._contentElement = contentElement;
    container.append(contentElement);

    this.render();
  }

  override hide(): void {
    this.#progress = 0;
    this.#html = '';
    this.#label = '';
    super.hide();
  }

  public set label(label: Label) {
    this.#label = label;
    this.render();
  }

  public set html(html: string) {
    this.#html = html;
    this.render();
  }

  public set progress(progress: number) {
    this.#progress = progress;
    this.render();
  }

  override render(): void {
    super.render();

    this._progressElement.style.width = `${this.#progress}%`;
    this._loaderElement.style.animation = this._shown ? 'rotate 1.2s infinite linear' : 'none';

    if (this.#html) {
      this._contentElement.innerHTML = this.#html;
    } else {
      if (this.#label instanceof Array) {
        this._contentElement.innerHTML = `<div>${this.#label.join('</div><div>')}</div>`;
      } else {
        this._contentElement.innerText = this.#label;
      }
    }
  }
}
