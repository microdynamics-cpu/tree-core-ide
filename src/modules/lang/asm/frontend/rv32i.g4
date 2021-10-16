grammar rv32i;

import utils;

rv32i_u_type_inst: ('lui' | 'auipc') op_regimm;
rv32i_j_type_inst: 'jal' op_regimm;
rv32i_b_type_inst:
	('beq'
	| 'bne'
	| 'blt'
	| 'bge'
	| 'bltu'
	| 'bgeu') op_reg2imm;
rv32i_i_type_inst:
	'jalr'  op_regimmreg
	| 'lb'  op_regimmreg
	| 'lh'  op_regimmreg
	| 'lw'  op_regimmreg
	| 'lbu' op_regimmreg
	| 'lhu' op_regimmreg
	| 'addi' op_reg2imm
	| 'slti' op_reg2imm
	| 'sltiu' op_reg2imm
	| 'xori' op_reg2imm
	| 'ori' op_reg2imm
	| 'andi' op_reg2imm
	| 'slli' op_reg2imm
	| 'srli' op_reg2imm
	| 'srai' op_reg2imm
	| 'fence'
	| 'fence.i'
	| 'ecall'
	| 'ebreak'
	| 'csrrw' op_reg3
	| 'csrrs' op_reg3
	| 'csrrc' op_reg3
	| 'csrrwi' op_reg2imm
	| 'csrrsi' op_reg2imm
	| 'csrrci' op_reg2imm; 
rv32i_s_type_inst: ('sb' | 'sh' | 'sw') op_regimmreg
    ;
rv32i_r_type_inst:
	('add'
	| 'sub'
	| 'sll'
	| 'slt'
	| 'sltu'
	| 'xor'
	| 'srl'
	| 'sra'
	| 'or'
	| 'and') op_reg3;

op_regimm: REG ',' IMM;
op_reg2imm: REG ',' REG ',' IMM;
op_regimmreg: REG ',' IMM '(' REG ')';
op_reg3: REG ',' REG ',' REG;

