import { MercadoPagoConfig, Payment } from 'mercadopago';

// Configuração do cliente do Mercado Pago
const client = new MercadoPagoConfig({ 
    accessToken: 'APP_USR-6462663530067323-100302-1eb4b8ec5ae36bd96ec504f6d708b90b-779023770' 
});

// Interface para o pagamento
interface PaymentResponse {
    qrCodeBase64?: string; // Para pagamentos via PIX
    paymentLink?: string;   // Para pagamentos via cartão ou saldo
    paymentId: string;      // ID do pagamento
}

// Tipo para os métodos de pagamento suportados
type PaymentMethod = 'pix' | 'visa' | 'master' | 'account_money';

// Classe para processamento de pagamentos
export class Payments {
    private userEmail: string;
    private userName: string;

    constructor(email: string, name: string) {
        this.userEmail = email;
        this.userName = name;
    }

    /**
     * Gera um pagamento e retorna as informações do QR Code ou link de pagamento.
     * @param amount - Valor da transação
     * @param description - Descrição do pagamento
     * @param paymentMethod - Método de pagamento ('pix', 'visa', 'master', 'account_money')
     */
    async generatePayment(amount: number, description: string, paymentMethod: PaymentMethod): Promise<PaymentResponse> {
        // Dados do pagamento
        const paymentData = {
            transaction_amount: amount,
            description: description,
            payment_method_id: paymentMethod,
            payer: {
                email: this.userEmail,
                first_name: this.userName,
            },
        };

        try {
            // Criando pagamento usando o método create da classe Payment
            const payment = new Payment(client);
            const response = await payment.create({ body: paymentData });

            // Verifica o método de pagamento e retorna as informações apropriadas
            if (paymentMethod === 'pix') {
                const qrCodeBase64 = response.point_of_interaction.transaction_data.qr_code_base64;
                return {
                    qrCodeBase64,
                    paymentId: response.id,
                };
            } else {
                const paymentLink = response.init_point; // Link para pagamento com cartão ou saldo
                return {
                    paymentLink,
                    paymentId: response.id,
                };
            }
        } catch (error) {
            throw new Error(`Erro ao gerar pagamento: ${error.message}`);
        }
    }
}