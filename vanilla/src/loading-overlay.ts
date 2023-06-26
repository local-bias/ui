import { css } from '@emotion/css';
import { Overlay } from './overlay';

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
    container.classList.add(this.containerStyle);
    this._root.append(container);

    const loaderElement = document.createElement('div');
    loaderElement.innerHTML = '<div><div></div></div>';
    loaderElement.classList.add(this.loaderStyle);
    this._loaderElement = loaderElement;
    container.append(loaderElement);

    const progressElement = document.createElement('div');
    progressElement.classList.add(this.progressStyle);
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

  private containerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    padding: 32px 64px;
    background-color: #fffc;
    border-radius: 8px;
    box-shadow: 0 5px 24px -6px #0002;
    width: 300px;
    max-width: 90vw;
    min-height: 200px;
    position: relative;
    overflow: hidden;
    transition: all 250ms ease;
  `;

  private loaderStyle = css`
    font-size: 60px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px #3b82f633;
    position: relative;
    > div {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 0.5em;
      height: 1em;
      margin-left: -0.5em;
      margin-top: -0.5em;
      overflow: hidden;
      transform-origin: 0.5em 0.5em;
      mask-image: linear-gradient(top, #000f, #0000);
      -webkit-mask-image: -webkit-linear-gradient(top, #000f, #0000);

      > div {
        width: 1em;
        height: 1em;
        border-radius: 50%;
        box-shadow: inset 0 0 0 1px #3b82f6;
      }
    }
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  private progressStyle = css`
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #2563eb;
    transition: all 350ms ease;
  `;
}
