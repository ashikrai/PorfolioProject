export const AboutMeCpp=
`
#include <iostream>
#include <vector>

class AshikRai {// [!code highlight]
  private:
    std::string company = "IBM";// [!code highlight]

  public:
    std::string role = "Software Engineer";// [!code highlight]

    std::vector<std::string> languages = {"Go", "C++", "Python", "JavaScript", "TypeScript"};
    std::vector<std::string> backend   = {"Go", "Node.js", "gRPC", "Protobuf", "Redis", "MongoDB", "MySQL"};
    std::vector<std::string> frontend  = {"React", "Redux", "Material UI", "Tailwind", "Ant Design"};
    std::vector<std::string> cloud     = {"Docker", "Linux", "Grafana", "Prometheus", "eBPF"};
    std::vector<std::string> agenticAI = {"N8N", "Agentic AI", "Agentic RAG", "conversational voice AI", "Flowise"};

    std::string currentlyLearning = "Kubernetes • Kafka • Distributed Systems • Network Programming";

    void sayHi() {
        std::cout << "Building scalable backend systems 🚀\\n";
    }
};

int main() {// [!code highlight]
  AshikRai me;
  me.sayHi();
  return 0;
}
`


export const AboutMeGo=`
package main

import "fmt"

type AshikRai struct {// [!code highlight]
  company            string
  Role               string
  Languages          []string
  Backend            []string
  Frontend           []string
  Cloud              []string
  AgenticAI          []string
  CurrentlyLearning  string
}

func (a *AshikRai) SayHi() {
    fmt.Println("Building scalable backend systems 🚀")
}

func main() {// [!code highlight]
    me := AshikRai{
        company:           "IBM",// [!code highlight]
        Role:              "Software Engineer",// [!code highlight]
        Languages:         []string{"Go", "C++", "Python", "JavaScript", "TypeScript"},
        Backend:           []string{"Go", "Node.js", "gRPC", "Protobuf", "Redis", "MongoDB", "MySQL"},
        Frontend:          []string{"React", "Redux", "Material UI", "Tailwind", "Ant Design"},
        Cloud:             []string{"Docker", "Linux", "Grafana", "Prometheus", "eBPF"},
        AgenticAI:         []string{"N8N", "Agentic AI", "Agentic RAG", "conversational voice AI", "Flowise"},
        CurrentlyLearning: "Kubernetes • Kafka • Distributed Systems • Network Programming",
    }

    me.SayHi()
}
`

export const AboutMeJs=`
class AshikRai {
  #company = "IBM"; // Private field// [!code highlight]

  constructor() {
    this.role = "Software Engineer";// [!code highlight]
    this.languages = ["Go", "C++", "Python", "JavaScript", "TypeScript"];
    this.backend = ["Go", "Node.js", "gRPC", "Protobuf", "Redis", "MongoDB", "MySQL"];
    this.frontend = ["React", "Redux", "Material UI", "Tailwind", "Ant Design"];
    this.cloud = ["Docker", "Linux", "Grafana", "Prometheus", "eBPF"];
    this.agenticAI = ["N8N", "Agentic AI", "Agentic RAG", "conversational voice AI", "Flowise"];
    this.currentlyLearning = "Kubernetes • Kafka • Distributed Systems • Network Programming";
  }

  sayHi() {
    console.log("Building scalable backend systems 🚀");
  }
}

// Execution
const me = new AshikRai();// [!code highlight]
me.sayHi();
`

export const AboutMePython=`
class AshikRai:
    def __init__(self):
        self.__company = "IBM"  # Private field// [!code highlight]
        self.role = "Software Engineer" #// [!code highlight]
        self.languages = ["Go", "C++", "Python", "JavaScript", "TypeScript"]
        self.backend = ["Go", "Node.js", "gRPC", "Protobuf", "Redis", "MongoDB", "MySQL"]
        self.frontend = ["React", "Redux", "Material UI", "Tailwind", "Ant Design"]
        self.cloud = ["Docker", "Linux", "Grafana", "Prometheus", "eBPF"]
        self.agenticAI = ["N8N", "Agentic AI", "Agentic RAG", "conversational voice AI", "Flowise"]
        self.currentlyLearning = "Kubernetes • Kafka • Distributed Systems • Network Programming"

    def say_hi(self):
        print("Building scalable backend systems 🚀")

if __name__ == "__main__":
    me = AshikRai() #// [!code highlight]
    me.say_hi()
`