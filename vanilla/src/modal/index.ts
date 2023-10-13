import { Overlay } from '../overlay';
import {
  actionsStyle,
  containerStyle,
  iconStyle,
  loaderStyle,
  progressStyle,
  titleStyle,
} from './style';

type Label = string | string[];
type ConstructorProps = Readonly<Partial<{ label: Label; progress: number }>>;

export class Modal extends Overlay {
  #title: string;
  #html: string;
  #label: Label;
  #progress: number | null;
  #state: 'loading' | 'alert' | 'hidden';

  protected readonly _iconElement: HTMLDivElement;
  protected readonly _titleElement: HTMLDivElement;
  protected readonly _loaderElement: HTMLDivElement;
  protected readonly _progressElement: HTMLDivElement;
  protected readonly _contentElement: HTMLDivElement;
  protected readonly _actionsElement: HTMLDivElement;

  public constructor(props: ConstructorProps = {}) {
    super();

    this.#title = '';
    this.#html = '';
    this.#label = props.label ?? '';
    this.#progress = props.progress ?? null;
    this.#state = 'hidden';

    const container = document.createElement('div');
    container.classList.add(containerStyle);
    this._root.append(container);

    const iconElement = document.createElement('div');
    iconElement.classList.add(iconStyle);
    this._iconElement = iconElement;
    container.append(iconElement);

    const titleElement = document.createElement('div');
    titleElement.classList.add(titleStyle);
    this._titleElement = titleElement;
    container.append(titleElement);

    const loaderElement = document.createElement('div');
    loaderElement.innerHTML = '<div><div></div></div>';
    loaderElement.classList.add(loaderStyle);
    this._loaderElement = loaderElement;

    const progressElement = document.createElement('div');
    progressElement.classList.add(progressStyle);
    this._progressElement = progressElement;
    container.append(progressElement);

    const contentElement = document.createElement('div');
    this._contentElement = contentElement;
    container.append(contentElement);

    const actionsElement = document.createElement('div');
    actionsElement.classList.add(actionsStyle);
    this._actionsElement = actionsElement;
    container.append(actionsElement);

    this.render();
  }

  public alert(params: { title?: string; text?: string; icon?: string }): void {
    this.#title = params.title ?? '';
    this.#label = params.text ?? '';
    this.changeState('alert');
    this.show();
  }

  public loading(): void {
    this._iconElement.append(this._loaderElement);
    this.changeState('loading');
    this.show();
  }

  override hide(): void {
    this.#progress = 0;
    this.#html = '';
    this.#label = '';
    this.changeState('hidden');
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

  private changeState(state: 'loading' | 'alert' | 'hidden'): void {
    this.#state = state;
    const elements = [
      this._root,
      this._actionsElement,
      this._contentElement,
      this._iconElement,
      this._loaderElement,
      this._progressElement,
      this._titleElement,
    ];
    for (const element of elements) {
      element.dataset.state = state;
    }

    this.render();
  }

  override render(): void {
    super.render();

    this._progressElement.style.width = `${this.#progress}%`;

    switch (this.#state) {
      case 'loading':
        break;
      case 'alert':
        this._iconElement.innerHTML = '';
        break;
      case 'hidden':
      default:
        this._iconElement.innerHTML = '';
        break;
    }

    this._titleElement.textContent = this.#title;
    if (this.#html) {
      this._contentElement.innerHTML = this.#html;
    } else {
      if (this.#label instanceof Array) {
        this._contentElement.innerHTML = `<div>${this.#label.join('</div><div>')}</div>`;
      } else {
        this._contentElement.textContent = this.#label;
      }
    }
  }
}
