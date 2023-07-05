type taskInterface = {
  id: number;
  name: string;
  description: string;
  deadline: string;
  category: string;
  status: 'TODO' | 'In Progress' | 'Done';
  tagName: string[];
  subTaskName: string[];
};
