import { ChangeDetectorRef, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  ICalendarStrings,
  IContextualMenuProps,
  ISelection,
  Selection,
  DropdownMenuItemType,
  IDropdownOption,
  ICheckboxProps,
  IPersonaProps,
  IPeoplePickerProps,
  IButtonProps,
  BaseButton,
  Button
} from 'office-ui-fabric-react';
import { RenderPropOptions } from '@angular-react/core';
import { FabDropdownComponent } from '@angular-react/fabric';
import { FabPeoplePickerComponent } from '@angular-react/fabric/public-api';

const suffix = ' cm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  renderCheckboxLabel: RenderPropOptions<ICheckboxProps> = {
    getProps: defaultProps => ({
      ...defaultProps,
      label: defaultProps.label.toUpperCase(),
    }),
  };

  @ViewChild('customRange', { static: false }) customRangeTemplate: TemplateRef<{
    item: any;
    dismissMenu: (ev?: any, dismissAll?: boolean) => void;
  }>;

  onClickEventHandler(ev) {
    console.log('onClick', { ev });
  }

  onMouseOverEventHandler(ev) {
    console.log('onMouseOver', { ev });
  }

  logEvent(...args: any[]) {
    console.log(args);
  }

  peoplePickerSelectedItems: any[] = [{text:"Default person"}];
  pickerSuggestions: IPersonaProps[] = [{text: "Bob Jones"},{text: "Steve Fred"}, {text: "Mary"}];

  selectedItem?: IDropdownOption;
  options: FabDropdownComponent['options'] = [
    { key: 'A', text: 'Option a' },
    { key: 'B', text: 'Option b' },
    { key: 'C', text: 'Option c' },
    { key: 'D', text: 'Option d' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'E', text: 'Option e' },
    { key: 'F', text: 'Option f' },
    { key: 'G', text: 'Option g' },
  ];

  textFieldValue = 'Hello';

  marqueeEnabled: boolean;
  runDisabled: boolean;
  selection: ISelection;

  strings: ICalendarStrings = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],

    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    goToToday: 'Go to today',
    weekNumberFormatString: 'Week number {0}',
  };

  detailItems = [
    { field1: 'f1content1', field2: 'f2content1' },
    { field1: 'f1content2', field2: 'f2content2' },
    { field1: 'f1content3', field2: 'f2content3' },
    { field1: 'f1content4' },
    { field2: 'f2content5' },
  ];

  teachingBubblePrimaryButtonProps: IButtonProps = {
    children: 'Primary action',
    onClick: (event:  React.MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement | BaseButton | Button | HTMLSpanElement, MouseEvent>) => alert('Primary action clicked'),
  };

  teachingBubbleSecondaryButtonProps: IButtonProps = {
    children: 'Maybe later',
    onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement | BaseButton | Button | HTMLSpanElement, MouseEvent>) => alert('Maybe later clicked'),
  };

  isCalloutVisible = false;
  isTeachingBubbleVisible = false;

  onOpenCalloutClicked() {
    this.isCalloutVisible = true;
  }

  onOpenTeachingBubbleClicked() {
    this.isTeachingBubbleVisible = true;
  }

  onCalloutDismiss(event) {
    this.isCalloutVisible = false;
  }

  onTeachingBubbleDismiss(event) {
    this.isTeachingBubbleVisible = false;
  }

  onNewClicked() {
    console.log('New clicked');
  }

  onCopyClicked() {
    console.log('Copy clicked');
  }

  onSaveAsClicked() {
    console.log('Save as clicked');
  }

  onSaveAsFirstClicked() {
    console.log('Save as 1 clicked');
  }

  onSaveAsSecondClicked() {
    console.log('Save as 2 clicked');
  }

  onCustomItemClick(item: any) {
    this.customItemCount++;
    console.log('custom item clicked', item);
  }

  onSelectDate($event) {
    console.log($event);
  }

  onColumnHeaderClicked(event: any) {
    console.log('Column header clicked', event);
  }

  onIncrement(value: string): string | void {
    value = this._removeSuffix(value, suffix);

    if (+value >= 13) {
      return value + suffix;
    }

    return String(+value + 2) + suffix;
  }

  onDecrement(value: string): string | void {
    value = this._removeSuffix(value, suffix);

    if (+value <= 3) {
      return value + suffix;
    }
    return String(+value - 2) + suffix;
  }

  onValidate(value: string, event: Event): string | void {
    value = this._removeSuffix(value, suffix);
    if (value.trim().length === 0 || isNaN(+value)) {
      return '0' + suffix;
    }

    return String(value) + suffix;
  }

  peoplePickerInputChanged(data: any){
    const results = this.pickerSuggestions.filter(value => value.text.toLowerCase().indexOf(data.toLowerCase()) > -1);
    return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 250));
  }

  updatePeoplePickerSelectedItems(items){
    this.peoplePickerSelectedItems = items.items;
  }

  private _hasSuffix(value: string, suffix: string): Boolean {
    const subString = value.substr(value.length - suffix.length);
    return subString === suffix;
  }

  private _removeSuffix(value: string, suffix: string): string {
    if (!this._hasSuffix(value, suffix)) {
      return value;
    }

    return value.substr(0, value.length - suffix.length);
  }

  constructor(private readonly cd: ChangeDetectorRef) {
    this.selection = new Selection();

    this.onValidate = this.onValidate.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.peoplePickerInputChanged = this.peoplePickerInputChanged.bind(this);
  }

  customItemCount = 1;

  // FIXME: Allow declarative syntax too
  saveSubMenuProps: Partial<IContextualMenuProps> = {
    gapSpace: 10,
    /*     items: [
      {
        key: 'save',
        text: 'Save',
        onClick: () => console.log('Save clicked'),
      },
      {
        key: 'save-as',
        text: 'Save as',
        subMenuProps: {
          onItemClick: (ev, item) => {
            console.log(`${item.text} clicked`);
            return true;
          },
          items: [
            {
              key: 'save-as-1',
              text: 'Save as 1',
            },
            {
              key: 'save-as-2',
              text: 'Save as 2',
            },
          ],
        },
      },
    ], */
  };

  /*   commandBarItems: ReadonlyArray<ICommandBarItemOptions> = [
    {
      key: 'run',
      text: 'Run',
      iconProps: {
        iconName: 'CaretRight',
      },
      disabled: true,
    },
    {
      key: 'new',
      text: 'New',
      iconProps: {
        iconName: 'Add',
      },
      onClick: () => console.log('Add clicked'),
    },
    {
      key: 'save',
      text: 'Save',
      iconProps: {
        iconName: 'Save'
      },
      subMenuProps: {
        items: [
          {
            key: 'save',
            text: 'Save',
            onClick: () => console.log('Save clicked'),
          },
          {
            key: 'save-as',
            text: 'Save as',
            subMenuProps: {
              onItemClick: (ev, item) => {
                console.log(`${item.text} clicked`)
                return true;
              },
              items: [
                {
                  key: 'save-as-1',
                  text: 'Save as 1',
                },
                {
                  key: 'save-as-2',
                  text: 'Save as 2',
                },
              ],
            },
          },
        ],
      },
    },
    {
      key: 'copy',
      text: 'Copy',
      iconProps: {
        iconName: 'Copy'
      },
      onClick: () => console.log('Copy clicked'),
    },
    {
      key: 'date-picker',
      text: 'Last 30 days',
      iconProps: {
        iconName: 'Calendar',
      },
      subMenuProps: {
        onItemClick: (ev, item) => {
          console.log(item.text, 'clicked');

          this.commandBarItems.find(item => item.key === 'date-picker').text = item.text;
          this.commandBarItems = [...this.commandBarItems];
        },
        items: [
          {
            key: '24h',
            text: 'Last 24 hours',

          },
          {
            key: '7d',
            text: 'Last 7 days',
          },
          {
            key: '30d',
            text: 'Last 30 days',
          },
          {
            key: 'custom',
            text: 'Custom range...',
            onClick: () => {
              this.commandBarItems = [
                ...this.commandBarItems,
                {
                  key: 'custom-range-range',
                  data: {
                    earliestDateAllowed: new Date(2015, 2, 15),
                  },
                  render: this.customRangeTemplate,
                  onClick: () => {
                    debugger;
                  }
                },
              ];
            },
          },
        ]
      }
    },
    {
      key: 'schedule-monitor',
      text: 'Schedule a monitor',
      iconProps: {
        iconName: 'ScheduleEventAction'
      },
      onClick: () => {
        this.isPanelOpen = true;
        console.log('Schedule a monitor clicked');
      }
    },
  ];

  commandBarFarItems: ReadonlyArray<ICommandBarItemOptions> = [
    {
      key: 'help',
      text: 'Help',
      iconProps: {
        iconName: 'Help'
      },
      onClick: () => console.log('Help clicked'),
    },
    {
      key: 'full-screen',
      iconOnly: true,
      iconProps: {
        iconName: 'MiniExpand'
      },
      onClick: () => console.log('Expand clicked'),
    }
  ]; */

  isPanelOpen = false;

  toggleRun() {
    this.runDisabled = !this.runDisabled;
  }

  toggleFullScreen() {
    this.fullScreenIcon = this.fullScreenIcon === 'BackToWindow' ? 'MiniExpand' : 'BackToWindow';
  }

  fullScreenIcon = 'MiniExpand';
}
