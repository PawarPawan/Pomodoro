export interface Timer {
  title: string;
  description: string;
  pomodoro: number;
  short: number;
  priority: number;
  totaltime: number;
  datetime: number;
  status: boolean;
  delete: boolean;
}

export const emptyTimer: Timer = {
  title: 'Important Task',
  description: '“A man who dares to waste one hour of time has not discovered the value of life.”',
  pomodoro: 2,
  priority: 10,
  short: 5,
  totaltime: 1,
  datetime: new Date().getTime(),
  status: false,
  delete: false
};

export interface ModalConfig {
  readonly confirm: any;
  readonly timer?: Timer;
}
