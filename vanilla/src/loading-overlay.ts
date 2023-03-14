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
    this._loaderElement.style.animationName = this._shown ? 'spin' : 'none';

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
    min-width: 300px;
    max-width: 90vw;
    min-height: 200px;
    position: relative;
    overflow: hidden;
    transition: all 250ms ease;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
        border-radius: 1em;
      }
      20% {
        transform: rotate(0deg);
      }
      30%,
      60% {
        border-radius: 0.25em;
      }
      70% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(180deg);
        border-radius: 1em;
      }
    }
  `;

  private loaderStyle = css`
    font-size: 48px;
    width: 1em;
    height: 1em;
    position: relative;
    border: 2px solid #2563ebaa;
    border-radius: 1em;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-play-state: running;
  `;

  private progressStyle = css`
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 0%;
    height: 3px;
    background-color: #2563eb;
    transition: all 250ms ease;
  `;
}
