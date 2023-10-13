import { Modal } from "../../../../vanilla/dist";
import "./react";

console.log("javascript file loaded!");

document.addEventListener("DOMContentLoaded", () => {
  const modal = new Modal();

  const loading = () => {
    modal.label = "Loading...";
    modal.loading();

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        modal.label = `ステップ${i + 1}を実行中...`;
        modal.progress = (i + 1) * 20;
      }, i * 1200);
    }
    setTimeout(() => {
      modal.html = `<div><ul><li>1</li><li>2</li><li>3</li></ul></div>`;
    }, 5000);
  };

  const showModal = () => {
    modal.alert({
      title: "タイトル",
      text: "テキスト",
      icon: "success",
    });
    modal.show();

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        modal.label = `ステップ${i + 1}を実行中...`;
        modal.progress = (i + 1) * 20;
      }, i * 1200);
    }
    setTimeout(() => {
      modal.html = `<div><ul><li>1</li><li>2</li><li>3</li></ul></div>`;
    }, 5000);
  };

  const button = document.createElement("button");
  button.textContent = "show loading overlay";
  document.body.append(button);
  button.addEventListener("click", () => {
    console.log("clicked");
    loading();
  });

  const button2 = document.createElement("button");
  button2.textContent = "modal";
  document.body.append(button2);
  button2.addEventListener("click", () => {
    console.log("clicked");
    showModal();
  });

  const fab = document.createElement("button");
  fab.style.position = "fixed";
  fab.style.bottom = "20px";
  fab.style.right = "20px";
  fab.style.padding = "8px 16px";
  fab.style.zIndex = "10000";
  fab.textContent = "hide";
  document.body.append(fab);
  fab.addEventListener("click", () => {
    modal.hide();
  });
});
