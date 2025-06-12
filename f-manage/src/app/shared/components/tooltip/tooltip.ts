import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('appTooltip') tooltipText = '';
  private tooltipElement: HTMLElement | null = null;
  private showTimeout: any;
  private hideTimeout: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.createTooltipElement();
  }

  ngOnDestroy() {
    this.removeTooltipElement();
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  private createTooltipElement() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.setStyle(this.tooltipElement, 'position', 'fixed');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '9999');
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
    this.renderer.setStyle(this.tooltipElement, 'background-color', 'rgba(0, 0, 0, 0.8)');
    this.renderer.setStyle(this.tooltipElement, 'color', 'white');
    this.renderer.setStyle(this.tooltipElement, 'padding', '4px 8px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '12px');
    this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 0.2s ease-in-out');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
    this.renderer.setStyle(this.tooltipElement, 'box-shadow', '0 2px 4px rgba(0,0,0,0.2)');

    this.renderer.appendChild(document.body, this.tooltipElement);

    // Add event listeners
    this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.showTooltip());
    this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hideTooltip());
  }

  private showTooltip() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    this.showTimeout = setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.setProperty(this.tooltipElement, 'textContent', this.tooltipText);
        this.renderer.setStyle(this.tooltipElement, 'display', 'block');
        this.renderer.setStyle(this.tooltipElement, 'opacity', '1');

        const rect = this.el.nativeElement.getBoundingClientRect();
        const tooltipRect = this.tooltipElement.getBoundingClientRect();

        const top = rect.bottom + 8; 
        const left = rect.left;

        const rightEdge = left + tooltipRect.width;
        const adjustedLeft = rightEdge > window.innerWidth 
          ? window.innerWidth - tooltipRect.width - 8
          : left;

        const bottomEdge = top + tooltipRect.height;
        const adjustedTop = bottomEdge > window.innerHeight
          ? rect.top - tooltipRect.height - 8 
          : top;

        this.renderer.setStyle(this.tooltipElement, 'top', `${adjustedTop}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${adjustedLeft}px`);
      }
    }, 200);
  }

  private hideTooltip() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    this.hideTimeout = setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
        setTimeout(() => {
          if (this.tooltipElement) {
            this.renderer.setStyle(this.tooltipElement, 'display', 'none');
          }
        }, 200);
      }
    }, 100);
  }

  private removeTooltipElement() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
