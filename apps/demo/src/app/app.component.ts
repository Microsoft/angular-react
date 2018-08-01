import { FabCommandBarComponent, ICommandBarItemOptions } from '@angular-react/fabric';
import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild(FabCommandBarComponent)
  commandBar: FabCommandBarComponent;
  @ViewChild('customRange')
  customRangeTemplate: TemplateRef<{ item: any; dismissMenu: (ev?: any, dismissAll?: boolean) => void }>;

  commandBarItems: ReadonlyArray<ICommandBarItemOptions> = [
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
        iconName: 'Save',
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
        ],
      },
    },
    {
      key: 'copy',
      text: 'Copy',
      iconProps: {
        iconName: 'Copy',
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
                  },
                },
              ];
            },
          },
        ],
      },
    },
    {
      key: 'schedule-monitor',
      text: 'Schedule a monitor',
      iconProps: {
        iconName: 'ScheduleEventAction',
      },
      onClick: () => {
        this.isPanelOpen = true;
        console.log('Schedule a monitor clicked');
      },
    },
  ];

  commandBarFarItems: ReadonlyArray<ICommandBarItemOptions> = [
    {
      key: 'help',
      text: 'Help',
      iconProps: {
        iconName: 'Help',
      },
      onClick: () => console.log('Help clicked'),
    },
    {
      key: 'full-screen',
      iconOnly: true,
      iconProps: {
        iconName: 'MiniExpand',
      },
      onClick: () => console.log('Expand clicked'),
    },
  ];

  isPanelOpen = false;

  toggleRun() {
    this.commandBarItems = this.commandBarItems.map(
      item => (item.key === 'run' ? { ...item, disabled: !item.disabled } : item)
    );
  }
}
