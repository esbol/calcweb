import { Contact } from "../contact";
import { Device } from "../device";
import { SectionLine } from "../sectionline";
import { useStore } from "vuex";

const store = useStore().state
const devices: Array<Device> = []
const sections: Array<SectionLine> = []
const contacts: Array<Contact> = []
const cables: Array<Device> = []
const pipes: Array<Device> = []


