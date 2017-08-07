import { stop, animate, Promise } from "liquid-fire";

export default function highlighNewText(opts={}) {

  stop(this.oldElement);
  if (this.oldElement) {
    this.oldElement.css('transform-origin', '50% 150%');
  }
  if (this.newElement) {
    this.newElement.css('transform-origin', '50% 150%');
  }
  return Promise.all([]);
}
