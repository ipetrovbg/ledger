import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
    // end state styles for route container (host)
    state('open', style({
      marginLeft: 0
    })),
    state('close', style({
      marginLeft: '-150px',
    })),
    transition('open <=> close', animate('.5s ease-in-out'))

  ]);
