grammar riscv;

import rv32i, rv64i;

prog: directive | label | inst;

directive: DIRECTIVE;
label: LABEL;
inst: r_type | i_type | s_type | b_type | u_type | j_type;

u_type: rv32i_u_type_inst;
j_type: rv32i_j_type_inst;
b_type: rv32i_b_type_inst;
i_type: rv32i_i_type_inst;
s_type: rv32i_s_type_inst;
r_type: rv32i_r_type_inst;