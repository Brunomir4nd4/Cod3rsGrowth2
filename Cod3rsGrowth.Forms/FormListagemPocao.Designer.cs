﻿namespace Cod3rsGrowth.Forms
{
    partial class FormListagemPocao
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            dataGridView1 = new DataGridView();
            pocaoBindingSource = new BindingSource(components);
            pocaoBindingSource1 = new BindingSource(components);
            idDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            idReceitaDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            dataDeFabricacaoDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            vencidoDataGridViewCheckBoxColumn = new DataGridViewCheckBoxColumn();
            ((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
            ((System.ComponentModel.ISupportInitialize)pocaoBindingSource).BeginInit();
            ((System.ComponentModel.ISupportInitialize)pocaoBindingSource1).BeginInit();
            SuspendLayout();
            // 
            // dataGridView1
            // 
            dataGridView1.AutoGenerateColumns = false;
            dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dataGridView1.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridView1.Columns.AddRange(new DataGridViewColumn[] { idDataGridViewTextBoxColumn, idReceitaDataGridViewTextBoxColumn, dataDeFabricacaoDataGridViewTextBoxColumn, vencidoDataGridViewCheckBoxColumn });
            dataGridView1.DataSource = pocaoBindingSource;
            dataGridView1.Dock = DockStyle.Top;
            dataGridView1.Location = new Point(0, 0);
            dataGridView1.Name = "dataGridView1";
            dataGridView1.RowTemplate.Height = 25;
            dataGridView1.Size = new Size(801, 450);
            dataGridView1.TabIndex = 0;
            // 
            // pocaoBindingSource
            // 
            pocaoBindingSource.DataSource = typeof(Dominio.Entidades.Pocao);
            // 
            // pocaoBindingSource1
            // 
            pocaoBindingSource1.DataSource = typeof(Dominio.Entidades.Pocao);
            // 
            // idDataGridViewTextBoxColumn
            // 
            idDataGridViewTextBoxColumn.DataPropertyName = "Id";
            idDataGridViewTextBoxColumn.HeaderText = "Id";
            idDataGridViewTextBoxColumn.Name = "idDataGridViewTextBoxColumn";
            // 
            // idReceitaDataGridViewTextBoxColumn
            // 
            idReceitaDataGridViewTextBoxColumn.DataPropertyName = "IdReceita";
            idReceitaDataGridViewTextBoxColumn.HeaderText = "IdReceita";
            idReceitaDataGridViewTextBoxColumn.Name = "idReceitaDataGridViewTextBoxColumn";
            // 
            // dataDeFabricacaoDataGridViewTextBoxColumn
            // 
            dataDeFabricacaoDataGridViewTextBoxColumn.DataPropertyName = "DataDeFabricacao";
            dataDeFabricacaoDataGridViewTextBoxColumn.HeaderText = "DataDeFabricacao";
            dataDeFabricacaoDataGridViewTextBoxColumn.Name = "dataDeFabricacaoDataGridViewTextBoxColumn";
            // 
            // vencidoDataGridViewCheckBoxColumn
            // 
            vencidoDataGridViewCheckBoxColumn.DataPropertyName = "Vencido";
            vencidoDataGridViewCheckBoxColumn.HeaderText = "Vencido";
            vencidoDataGridViewCheckBoxColumn.Name = "vencidoDataGridViewCheckBoxColumn";
            // 
            // FormListagemPocao
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(801, 449);
            Controls.Add(dataGridView1);
            Name = "FormListagemPocao";
            Text = "FormListagemPocao";
            Load += FormListagemPocao_Load;
            ((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
            ((System.ComponentModel.ISupportInitialize)pocaoBindingSource).EndInit();
            ((System.ComponentModel.ISupportInitialize)pocaoBindingSource1).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private DataGridView dataGridView1;
        private DataGridViewTextBoxColumn dataDeFabricaçãoDataGridViewTextBoxColumn;
        private BindingSource pocaoBindingSource;
        private BindingSource pocaoBindingSource1;
        private DataGridViewTextBoxColumn idDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn idReceitaDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn dataDeFabricacaoDataGridViewTextBoxColumn;
        private DataGridViewCheckBoxColumn vencidoDataGridViewCheckBoxColumn;
    }
}