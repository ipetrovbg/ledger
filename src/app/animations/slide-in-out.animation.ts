import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
    // end state styles for route container (host)
    state('open', style({
      // the view covers the whole screen with a semi tranparent background
      marginLeft: 0
    })),
    state('close', style({
      marginLeft: '-400%',
    })),
    transition('open <=> close', animate('1s ease-in-out'))

  ]);
