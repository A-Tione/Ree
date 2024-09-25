interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

type TreeProps = {
  sourceData: SourceDataItem[],
  onUpdateSourceData?: (values: SourceDataItem[]) => void
} & ({multiple: true, selected: string[], onChange: (values: string[]) => void} 
    | {multiple?: false, selected: string, onChange: (values: string) => void})