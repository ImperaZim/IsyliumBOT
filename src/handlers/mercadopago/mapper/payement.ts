import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ 
    accessToken: 'APP_USR-6462663530067323-100302-1eb4b8ec5ae36bd96ec504f6d708b90b-779023770' 
});

interface PaymentResponse {
    qrCodeBase64?: string;
    paymentLink?: string;
    paymentId: string;
}

type PaymentMethod = 'pix' | 'visa' | 'master' | 'account_money';

export class Payments {
    private userEmail: string;
    private userName: string;

    constructor(email: string, name: string) {
        this.userEmail = email;
        this.userName = name;
    }

    async generatePayment(amount: number, description: string, paymentMethod: PaymentMethod): Promise<PaymentResponse> {
      
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
            const payment = new Payment(client);
            const response = await payment.create({ body: paymentData });

            if (paymentMethod === 'pix') {
                const qrCodeBase64 = response.point_of_interaction.transaction_data.qr_code_base64;
                return {
                    qrCodeBase64,
                    paymentId: response.id,
                };
            } else {
                const paymentLink = response.init_point;
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