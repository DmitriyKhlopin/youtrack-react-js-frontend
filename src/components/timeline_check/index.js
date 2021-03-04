import {faCheckDouble} from "@fortawesome/free-solid-svg-icons";
import TimelineCheck from "./TimelineCheck";

const timelineCheck = {
    id: 66,
    name: 'Проверка вычислений периодов',
    path: '/timeline_check',
    component: TimelineCheck,
    availableInDrawer: true,
    icon: faCheckDouble,
    navBar: null
}

export default timelineCheck;
