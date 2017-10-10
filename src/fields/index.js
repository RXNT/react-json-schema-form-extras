import TableField from "./TableField";
import AsyncTypeaheadField from "./AsyncTypeaheadField";
import TypeaheadField from "./TypeaheadField";
import CompositeArrayField from "./CompositeArrayField";
import AltInputField from "./AltInputField";
import CollapsibleField from "./CollapsibleField";
import IMOTypeaheadField from "./imo/IMOField";
import RTEField from "./RTEField";

export default {
  table: TableField,
  asyncTypeahead: AsyncTypeaheadField,
  typeahead: TypeaheadField,
  collapsible: CollapsibleField,
  compositeArray: CompositeArrayField,
  altInput: AltInputField,
  rte: RTEField,
  imo: IMOTypeaheadField,
};
