export default async function handler(req, res) {
  const cep = req.query.cep;

  if (!cep) {
    return res.status(400).json({
      error: 'CEP não informado'
    });
  }

  try {

    const response = await fetch(
      'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: {
            postal_code: '18087600'
          },
          to: {
            postal_code: cep.replace(/\D/g, '')
          },
          products: [
            {
              id: '1',
              width: 20,
              height: 3,
              length: 30,
              weight: 0.1,
              insurance_value: 100,
              quantity: 1
            }
          ]
        })
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }
}
