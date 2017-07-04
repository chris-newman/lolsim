// Good Renderer tutorial https://netbasal.com/angular-2-explore-the-renderer-service-e43ef673b26c#.wfmi7j6rc
import { Directive, Renderer, ElementRef, HostListener, } from '@angular/core';
@Directive({
  selector: '[appMatrixBar]'
})
export class MatrixBarDirective {
  private elem: Node;
  private matrixBar: Node;
  private columns;
  constructor(private renderer: Renderer, private el: ElementRef) {
    this.elem = el.nativeElement;
    // create matrixBar that will be appended to the native element
    this.matrixBar = renderer.createElement(this.elem, 'matrixBar');
    // set the amount of columns to fill the current window
    this.columns = Math.ceil(window.innerWidth / 12);
    // initially fill the matrix bar in the constructor
    this.fillMatrixBar(this.columns);
  }

  // shrink or fill the matrix bar on window resize
  // http://stackoverflow.com/questions/35527559/angular2-get-window-width-onresize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const windowWidth = Math.ceil(event.target.innerWidth / 12);
    if (windowWidth > this.columns) {
      // account for the difference before calling fillMatrixBar
      const difference = windowWidth - this.columns;
      this.columns += windowWidth - this.columns;
      this.fillMatrixBar(difference);
    }
    if (windowWidth < this.columns) {
      // account for the difference before calling fillMatrixBar
      const difference = this.columns - windowWidth;
      this.shrinkMatrixBar(difference);
      this.columns -= difference;
    }
  }

  shrinkMatrixBar = (count: number) => {
    for (let x = 0; x < count; x++) {
      this.matrixBar.removeChild(this.matrixBar.lastChild);
    }
  }

  fillMatrixBar = (count: number) => {
    for (let x = 0; x < count; x++) {
      // create a div with class 'letter-col' that has a random animation duration
      const text: Node = this.renderer.createElement(null, 'div');
      this.renderer.setElementStyle(text, 'animation-duration', this.randomRange(2, 4) + 's');
      this.renderer.setElementClass(text, 'letter-col', true);
      // add 6 spans with text of 0 or 1 to the div
      for (let y = 0; y < 6; y++) {
        const span = this.renderer.createElement(text, 'span');
        this.renderer.createText(span, Math.random().toString(2).substr(2, 1));
      }
      this.matrixBar.appendChild(text);
    }
  }

  randomRange = (min, max) => {
    return (min + ((max - min) * Math.random())).toFixed(4);
  }
}
