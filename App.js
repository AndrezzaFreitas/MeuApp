import { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView
} from 'react-native';

//importando os estilos do arquivo separado
import{ styles} from "./styles";


import { useWindowDimensions } from 'react-native-web';

export default function App() {
  const [nome, setNome] = useState('');
  const [contador, setContador] = useState(0);
  const [temaEscuro, setTemaEscuro] = useState(false);

  //Meta Diário do App
  const meta = 10;
  const progresso = Math.min((contador / meta) * 100, 100);

  const {width} = useWindowDimensions();
  const telaPequena = width < 380;

  const corFundo = temaEscuro ? '#0F172A' : '#F1F5F9';
  const corTexto = temaEscuro ? '#F8FAFC' : '#0F172A';

  return (
    <View style={[styles.container, { backgroundColor: corFundo }]}>
      <StatusBar barStyle={temaEscuro ? 'light-content' : 'dark-content'} />

      <ScrollView contentContainerStyle={styles.conteudo}>

        <View style={[styles.cartao, { padding: telaPequena ? 15 : 22 }]}>
          <Text style={[styles.titulo, { fontSize: telaPequena ? 20 : 24 }]}>
            Meu Contador de Metas
          </Text>


          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#64748B"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.boasVindas}>
            {nome.trim() ? `Olá, ${nome}!` : 'Olá, estudante!'}
          </Text>

          <View style={styles.linhaMeta}>
          <Text>Progresso da meta</Text>

          <Text>
            {contador} / {meta}
          </Text>
          </View>

          <View style={styles.barraFundo}>
          <View
            style={[
              styles.barraProgresso,
              { width: `${progresso}%` }
            ]}
            />
          </View>

<Text style={styles.textoProgresso}>
  {Math.round(progresso)}% concluído
</Text>

          {contador >= 10 ? (
            <Text style={styles.mensagem}>
              Parabéns! Você chegou a 10 ou mais!
            </Text>
          ) : (
            <Text style={styles.dica}>
              Continue testando os botões.
            </Text>
          )}

          <View style={styles.linhaBotoes}>
            <Pressable
              disabled={contador === 0}
              style={[
                styles.botao,
                styles.botaoMenos,
                contador === 0 && styles.botaoDesabilitado
              ]}
              onPress={() => setContador(valor => Math.max(0, valor - 1))}
            >
              <Text style={styles.textoBotao}>− Diminuir</Text>
            </Pressable>

            <Pressable
              style={[styles.botao, styles.botaoMais]}
              onPress={() => setContador(valor => valor + 1)}
            >
              <Text style={styles.textoBotao}>+ Adicionar</Text>
            </Pressable>
          </View>

          <View style={styles.linhaBotoes}>
            <Pressable
              style={[styles.botao, styles.botaoZerar]}
              onPress={() => setContador(0)}
            >
              <Text style={styles.textoBotao}>Zerar</Text>
            </Pressable>

            <Pressable
              style={[styles.botao, styles.botaoTema]}
              onPress={() => setTemaEscuro(valor => !valor)}
            >
              <Text style={styles.textoBotao}>Mudar tema</Text>
            </Pressable>
          </View>
        </View>

        <Text style={[styles.rodape, { color: corTexto }]}>
          Desenvolvido na aula de Mobile I
        </Text>
      </ScrollView>
    </View>
  );
}