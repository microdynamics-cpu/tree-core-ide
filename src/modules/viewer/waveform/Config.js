
export const OPERATE_CONFIG = {
    display: {
        disableGpu: false,
        antialias: false,
        defaultTraceStyle: {
            renderer: "wire",
            color: "#00e676",
            fill: .2,
            height: 24,
            radix: "hex",
            littleEndian: false,
            strokeWidth: 2
        }
    },

    keyboard: {
        reload: "ctrl+r,f5",
        createGroup: "ctrl+g",
        addSignal: "shift+a,insert",
        deleteSignal: "delete",
        prevEdge: "left",
        nextEdge: "right",
        prevSignal: "up",
        nextSignal: "down",
        moveSignalUp: "ctrl+up",
        moveSignalDown: "ctrl+down",
        selectAll: "ctrl+a",
        zoomStart: "home",
        zoomEnd: "end",
        zoomIn: "pageUp",
        zoomOut: "pageDown",
        zoomFit: "f",
        zoomTarget: "mouse",
        zoomAmount: 1,
    },
    mouse: {
        smoothScrolling: true,
        reverseScrolling: false,
        zoomTarget: "mouse",
        zoomAmount: 1,
    },
    sidebar: {
        width: 280
    },
    theme: {
        palette: [
            '#000000', '#272727', '#3C3C3C', '#4F4F4F', '#5B5B5B', '#6C6C6C', '#7B7B7B', '#8E8E8E', '#9D9D9D', '#ADADAD', '#BEBEBE', '#D0D0D0',
            '#2F0000', '#4D0000', '#600000', '#750000', '#930000', '#AE0000', '#CE0000', '#EA0000', '#FF0000', '#FF2D2D', '#FF5151', '#FF7575',
            '#600030', '#820041', '#9F0050', '#BF0060', '#D9006C', '#F00078', '#FF0080', '#FF359A', '#FF60AF', '#FF79BC', '#FF95CA', '#FFAAD5',
            '#460046', '#5E005E', '#750075', '#930093', '#AE00AE', '#D200D2', '#E800E8', '#FF00FF', '#FF44FF', '#FF77FF', '#FF8EFF', '#FFA6FF',
            '#28004D', '#3A006F', '#4B0091', '#5B00AE', '#6F00D2', '#8600FF', '#921AFF', '#9F35FF', '#B15BFF', '#BE77FF', '#CA8EFF', '#D3A4FF',
            '#000079', '#000093', '#0000C6', '#0000C6', '#0000E3', '#2828FF', '#4A4AFF', '#6A6AFF', '#7D7DFF', '#9393FF', '#AAAAFF', '#B9B9FF',
            '#003060', '#003D79', '#004B97', '#005AB5', '#0066CC', '#0072E3', '#0080FF', '#2894FF', '#46A3FF', '#66B3FF', '#84C1FF', '#97CBFF',
            '#003E3E', '#005757', '#007979', '#009393', '#00AEAE', '#00CACA', '#00E3E3', '#00FFFF', '#4DFFFF', '#80FFFF', '#A6FFFF', '#BBFFFF',
            '#006030', '#01814A', '#019858', '#01B468', '#02C874', '#02DF82', '#02F78E', '#1AFD9C', '#4EFEB3', '#7AFEC6', '#96FED1', '#ADFEDC',
            '#006000', '#007500', '#009100', '#00A600', '#00BB00', '#00DB00', '#00EC00', '#28FF28', '#53FF53', '#79FF79', '#93FF93', '#A6FFA6',
            '#467500', '#548C00', '#64A600', '#73BF00', '#82D900', '#8CEA00', '#9AFF02', '#A8FF24', '#B7FF4A', '#C2FF68', '#CCFF80', '#D3FF93',
            '#424200', '#5B5B00', '#737300', '#8C8C00', '#A6A600', '#C4C400', '#E1E100', '#F9F900', '#FFFF37', '#FFFF6F', '#FFFF93', '#FFFFAA',
            '#5B4B00', '#796400', '#977C00', '#AE8F00', '#C6A300', '#D9B300', '#EAC100', '#FFD306', '#FFDC35', '#FFE153', '#FFE66F', '#FFED97',
            '#844200', '#9F5000', '#BB5E00', '#D26900', '#EA7500', '#FF8000', '#FF9224', '#FFA042', '#FFAF60', '#FFBB77', '#FFC78E', '#FFD1A4',
            '#642100', '#842B00', '#A23400', '#BB3D00', '#D94600', '#F75000', '#FF5809', '#FF8040', '#FF8F59', '#FF9D6F', '#FFAD86', '#FFBD9D',
            '#613030', '#743A3A', '#804040', '#984B4B', '#AD5A5A', '#B87070', '#C48888', '#CF9E9E', '#D9B3B3', '#E1C4C4', '#EBD6D6', '#F2E6E6',
            '#616130', '#707038', '#808040', '#949449', '#A5A552', '#AFAF61', '#B9B973', '#C2C287', '#CDCD9A', '#D6D6AD', '#DEDEBE', '#E8E8D0',
            '#336666', '#3D7878', '#408080', '#4F9D9D', '#5CADAD', '#6FB7B7', '#81C0C0', '#95CACA', '#A3D1D1', '#B3D9D9', '#C4E1E1', '#D1E9E9',
            '#484891', '#5151A2', '#5A5AAD', '#7373B9', '#8080C0', '#9999CC', '#A6A6D2', '#B8B8DC', '#C7C7E2', '#D8D8EB', '#E6E6F2', '#F3F3FA',
            '#6C3365', '#7E3D76', '#8F4586', '#9F4D95', '#AE57A4', '#B766AD', '#C07AB8', '#CA8EC2', '#D2A2CC', '#DAB1D5', '#E2C2DE', '#EBD3E8',
        ]
    },
    window: {
        x: 800,
        y: 800,
        width: 800,
        height: 600
    },
};