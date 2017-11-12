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
    transition('open <=> close', animate('.2s ease-in-out'))

  ]);

  export const slideInOut =
  trigger('slideInOut', [
    // end state styles for route container (host)
    state('open', style({
      left: '200px',
      width: 'calc(100% - 200px)'
    })),
    state('close', style({
      left: '50px',
      width: 'calc(100% - 50px)'
    })),
    transition('open <=> close', animate('.2s ease-in-out'))

  ]);
  
export const enterAnimation =
trigger(
  'enterAnimation', [
    transition(':enter', [
      style({ marginLeft: '-100px', opacity: 0 }),
      animate('0.2s ease-in', style({ marginLeft: 0, opacity: 1 }))
    ]),
    transition(':leave', [
      style({ marginLeft: 0, opacity: 0}),
      animate('10ms ease-out', style({ marginLeft: '-100px', opacity: 0 }))
    ])
  ]
);

export const showAnimation =
trigger(
  'showAnimation', [
    transition(':enter', [
      style({ marginLeft: '-20px', opacity: 0 }),
      animate('0.2s ease-in', style({ marginLeft: 0, opacity: 1 }))
    ]),
    transition(':leave', [
      style({ marginLeft: 0, opacity: 0}),
      animate('10ms ease-out', style({ marginLeft: '-20px', opacity: 0 }))
    ])
  ]
);