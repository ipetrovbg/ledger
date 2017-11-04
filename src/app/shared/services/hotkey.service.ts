import { Injectable } from '@angular/core';

import { Subject, Observable, BehaviorSubject } from 'rxjs/Rx';

import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { getState, IAppState } from '../../store/app.state';
import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from '../../store/ui/ui.reducer';
import { Store } from '@ngrx/store';
/**
 * Short key Service
 */
@Injectable()
export class HotkeyService {
  /**
   * Shortcuts
   * @type {{}}
   */
  public hotkeys: Object = {};

  /**
   * Creating observable for checking when the short keys are ready for use.
   */
  public isReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * all short keys from json file
   * with descriptions, used for displaying in Kendo-UI dialog box
   */
  private fullShortKeys: Array<any>;
  /**
   * General hotkeys
   * @private
   */
  private generalShortcuts: Array<any> = [
    {
      code: 'ctrl+shift+s',
      description: 'open/close sidebar'
    }
  ];

  /**
   * constructor
   * @param {HotkeysService} hotkey
   */
  constructor(
    private hotkey: HotkeysService,
    private store: Store<IAppState>,
  ) {}

  /**
   * Helper function for hotkeys with validation
   * @param key
   * @returns {any}
   */
  private onHotkey(key: string): Observable<{ state: boolean, key: string }> {
    return this.hotkeys[key];
  }

  /**
   * Register general hotkeys
   * @private
   */
  public registerGeneralShortcuts() {

    this.generalShortcuts.forEach(shortCuts => {
      this.addHotKey(shortCuts.code);
    });

    this.subscribeToGeneralShortcuts();
  }
  /**
   * Subscribe to general hotkeys
   * @private
   */
  private subscribeToGeneralShortcuts() {
    this.hotkeys['ctrl+shift+s'].subscribe(() => {
      getState(this.store).ui.sidebar.state === 'open' ?
        this.store.dispatch({ type: CLOSE_SIDEBAR }) :
        this.store.dispatch({ type: OPEN_SIDEBAR });

    });
  }

  /**
   * Process short keys
   * @param data
   * @private
   */
  private processShortKeys(data) {
    this.fullShortKeys = data.shortKeyDescription;

    this.fullShortKeys.forEach((keyCode) => {
      this.addHotKey(keyCode.code);
    });

    this.isReady$.next(true);
  }

  /**
   * Creating listener and subscription for keyCode
   * @param keyCode
   */
  public addHotKey(keyCode): void {
    this.hotkeys[keyCode] = new Subject();
    this.hotkey.add(new Hotkey(keyCode, (e) => {
      const event: { state: boolean, key: string, target: {} } = { state: true, key: keyCode, target: e.target };
      this.hotkeys[keyCode].next(event);
      return true;
    }));
    return this.hotkeys[keyCode];
  }
}
